import { isSupported, setup } from "@loomhq/loom-sdk";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PageWrapper } from "../../../../components/PageWrapper/PageWrapper";
import UserContext from "../../../../context/UserContext";
import { LIST_OF_QUESTIONS } from "../../../../helpers/questions";
import styles from "./Record.module.css";

const API_KEY = "GET-YOUR-OWN";
const BUTTON_ID = "loom-sdk-button";

export default function Record() {
  const { user, team } = useContext(UserContext);
  const [prompt, setPrompt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<"SUCCESS" | "ERROR" | "">("");

  const selectRef = useRef<HTMLSelectElement>(null);

  const recordHandler = () => {
    const setIt = () => setPrompt(selectRef?.current?.value || "");
    // small delay after recorder has launched
    setTimeout(setIt, 1000);
  };

  const randomPromptHandler = () => {
    const random = Math.floor(Math.random() * LIST_OF_QUESTIONS.length + 1);
    if (selectRef && selectRef.current) {
      selectRef.current.value = LIST_OF_QUESTIONS[random];
    }
  };

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

      const button = document.getElementById(BUTTON_ID);

      if (!button) {
        return;
      }

      const { configureButton } = await setup({
        apiKey: API_KEY,
      });

      const sdkButton = configureButton({ element: button });

      sdkButton.on("insert-click", async ({ sharedUrl }) => {
        setIsSubmitting(true);
        setStatus("");
        const body = {
          teamId: team?.id,
          userId: user?.id,
          shareUrl: sharedUrl,
        };
        try {
          const videoRes = await fetch("http://localhost:3000/api/video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const result = await videoRes.json();
          setStatus("SUCCESS");
          setIsSubmitting(false);
        } catch (e) {
          setStatus("ERROR");
          setIsSubmitting(false);
        }
      });

      sdkButton.on("lifecycle-update", async (state) => {
        console.log("state", state);
        if (state === "closed" || state === "post-recording") {
          setPrompt("");
        }
      });
    }

    setupLoom();
  }, [team?.id, user?.id]);

  return (
    <PageWrapper>
      <>
        <div
          className={`${styles.status} ${
            !!status.length && styles.statusAppear
          }`}
        >
          {status === "ERROR" ? (
            <span>
              <i
                className="bi bi-exclamation-circle-fill"
                style={{ fontSize: "1.5rem", color: "white" }}
              />
              Oh no! Something went wrong. Please try recording again.
            </span>
          ) : status === "SUCCESS" ? (
            <span>
              <i
                className="bi bi-cloud-check"
                style={{ fontSize: "1.5rem", color: "white" }}
              />
              <br />
              Yay! Your video has been added to your team! <br />
              <span style={{ textDecoration: "underline" }}>
                <Link href={`/team/${team?.id}`}>Go watch videos.</Link>
              </span>
              .
            </span>
          ) : (
            ""
          )}
        </div>
        <section className={!!prompt ? styles.prompt : styles.noPrompt}>
          {prompt}
        </section>
        <section className={styles.page}>
          <h1>How to record your video</h1>
          <ol>
            <li>Choose a prompt you like (or let fate choose one for you!)</li>
            <li>Click record</li>
            <li>
              If it looks good, click on {`"`}Insert recording {`>`}
              {`>"`} and you{`'`}re good to go!
            </li>
          </ol>
        </section>
        <section className={styles.choose}>
          <label>Choose a prompt:</label>
          <select name="prompt" ref={selectRef}>
            {LIST_OF_QUESTIONS.map((q, idx) => (
              <option key={idx} value={q}>
                {q}
              </option>
            ))}
          </select>
          <div>
            <button
              className={styles.randomButton}
              onClick={randomPromptHandler}
            >
              Random prompt
            </button>
            <button
              className={styles.recordButton}
              id={BUTTON_ID}
              onClick={recordHandler}
            >
              Record
            </button>
          </div>
        </section>
      </>
    </PageWrapper>
  );
}
