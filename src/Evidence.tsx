import { Check, ArrowUpRight, Download, FlaskConical } from "lucide-react";
import type { Rules, TestResult } from "./engine";
export type Run = {
  source?: string;
  usage?: string;
  version: number;
  rules: Rules;
  results: TestResult[];
  timestamp: string;
};
export function Evidence({
  runs,
  onRun,
  onRepair,
  busy,
  hasWorkflow,
  proposalReady,
  onApply,
}: {
  runs: Run[];
  onRun: () => void;
  onRepair: () => void;
  busy: boolean;
  hasWorkflow: boolean;
  proposalReady: boolean;
  onApply: () => void;
}) {
  const current = runs.at(-1),
    first = runs[0];
  const count = (r: Run | undefined) =>
    r ? `${r.results.filter((t) => t.pass).length} / ${r.results.length}` : "—";
  function download() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            { product: "Foundry", data: "synthetic", contractVersion: 1, runs },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    a.download = "foundry-evidence.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  return (
    <section className="evidence" id="prove">
      <h2>3. Test and gather evidence</h2>
      <p>
        Run the same contract against every version. Inspect what actually
        happened.
      </p>
      <ol className="test-list">
        {(
          current?.results ?? [
            { id: "valid", name: "Valid enquiry is recorded" },
            { id: "duplicate", name: "Duplicate is flagged" },
            { id: "email", name: "Missing email is blocked" },
            { id: "date", name: "Invalid follow-up is blocked" },
            { id: "unassigned", name: "Unassigned enquiry stays visible" },
          ]
        ).map((t, i) => (
          <li key={t.id}>
            <details>
              <summary>
                <span>
                  {i + 1}. {t.name}
                </span>
                <span
                  className={
                    "result " + ("pass" in t ? (t.pass ? "pass" : "fail") : "")
                  }
                >
                  {"pass" in t ? t.pass ? <Check size={16} /> : "×" : "—"}
                </span>
              </summary>
              {"actual" in t ? (
                <div className="test-detail">
                  <b>Expected</b>
                  <p>{String(t.expected)}</p>
                  <b>Observed</b>
                  <p>{String(t.actual)}</p>
                  <small>
                    {String(t.durationMs)} ms · isolated synthetic fixture
                  </small>
                </div>
              ) : (
                <p>Run tests to collect evidence.</p>
              )}
            </details>
          </li>
        ))}
      </ol>
      <button
        className="primary full"
        disabled={!hasWorkflow || busy}
        onClick={onRun}
      >
        <FlaskConical size={17} />
        Run tests
      </button>
      <div className="comparison">
        <h3>Compare results</h3>
        <p>Same tests. Versioned rules. Visible evidence.</p>
        <div className="compare-grid">
          <div>
            <b>Baseline</b>
            <strong>{count(first)}</strong>
            <small>{first ? `Version ${first.version}` : "Not run yet"}</small>
          </div>
          <div>
            <b>Latest</b>
            <strong>{count(current)}</strong>
            <small>
              {current ? `Version ${current.version}` : "Not run yet"}
            </small>
          </div>
        </div>
        {current && (
          <p className="timestamp">
            Executed {new Date(current.timestamp).toLocaleTimeString()} · local
            engine
          </p>
        )}
        <button
          className="primary full"
          disabled={!current || current.results.every((t) => t.pass) || busy}
          onClick={proposalReady ? onApply : onRepair}
        >
          {busy
            ? "Working…"
            : proposalReady
              ? "Apply repair & rerun"
              : "Propose repair"}
          <ArrowUpRight size={17} />
        </button>
        {proposalReady && (
          <small className="notice">
            Review the proposed rules in the brief, then apply. Passing tests
            must stay passing.
          </small>
        )}
        <button
          className="text-button export"
          disabled={!runs.length}
          onClick={download}
        >
          <Download size={15} />
          Download evidence
        </button>
      </div>
    </section>
  );
}
