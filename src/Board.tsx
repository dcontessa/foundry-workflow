import { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  createEnquiry,
  exampleInput,
  visibleEnquiries,
  type Enquiry,
  type Input,
  type Rules,
} from "./engine";
export function Board({
  records,
  setRecords,
  rules,
}: {
  records: Enquiry[];
  setRecords: (v: Enquiry[]) => void;
  rules: Rules;
}) {
  const [search, setSearch] = useState(""),
    [status, setStatus] = useState("all"),
    [adding, setAdding] = useState(false),
    [editing, setEditing] = useState<string | null>(null),
    [input, setInput] = useState<Input>({
      ...exampleInput,
      name: "",
      email: "",
      owner: "",
    }),
    [message, setMessage] = useState("");
  const visible = visibleEnquiries(records, rules).filter(
    (r) =>
      `${r.name} ${r.email} ${r.course}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "all" ||
        (status === "unassigned" ? !r.owner : r.status === status)),
  );
  function save(e: React.FormEvent) {
    e.preventDefault();
    const pool = records.filter((r) => r.id !== editing);
    const result = createEnquiry(pool, input, rules);
    setMessage(result.message);
    if (result.ok) {
      const created = result.records.at(-1)!;
      setRecords(
        editing
          ? records.map((r) =>
              r.id === editing ? { ...created, id: r.id, status: r.status } : r,
            )
          : result.records,
      );
      setAdding(false);
      setEditing(null);
    }
  }
  function edit(r: Enquiry) {
    setInput({ ...r });
    setEditing(r.id);
    setAdding(true);
    setMessage("");
  }
  return (
    <section className="board" id="workbench">
      <div className="section-heading">
        <h2>2. Interactive enquiry board</h2>
        <span>Synthetic demo data</span>
      </div>
      <p>Work with enquiries to explore and refine the workflow.</p>
      <div className="filters">
        <label className="search">
          <Search size={17} />
          <input
            aria-label="Search enquiries"
            placeholder="Search enquiries…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          aria-label="Filter status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All status</option>
          <option value="unassigned">Unassigned</option>
          {["new", "contacted", "qualified", "closed"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id}>
                <td>
                  <button className="text-button name" onClick={() => edit(r)}>
                    {r.name}
                  </button>
                  <small>{r.email || "No email"}</small>
                </td>
                <td>{r.course}</td>
                <td>
                  <select
                    aria-label={`Owner for ${r.name}`}
                    value={r.owner}
                    onChange={(e) =>
                      setRecords(
                        records.map((x) =>
                          x.id === r.id ? { ...x, owner: e.target.value } : x,
                        ),
                      )
                    }
                  >
                    <option value="">Unassigned</option>
                    {["Alex", "Taylor", "Morgan"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    aria-label={`Status for ${r.name}`}
                    value={r.status}
                    onChange={(e) =>
                      setRecords(
                        records.map((x) =>
                          x.id === r.id
                            ? {
                                ...x,
                                status: e.target.value as Enquiry["status"],
                              }
                            : x,
                        ),
                      )
                    }
                  >
                    {["new", "contacted", "qualified", "closed"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && (
        <p className="empty">No enquiries match this view.</p>
      )}
      <div className="board-footer">
        <button
          className="secondary"
          onClick={() => {
            setInput({ ...exampleInput, name: "", email: "", owner: "" });
            setEditing(null);
            setAdding(true);
            setMessage("");
          }}
        >
          <Plus size={16} />
          Add enquiry
        </button>
        <span>
          {visible.length} visible / {records.length} saved
        </span>
      </div>
      {!rules.showUnassigned && (
        <p className="warning">
          Baseline gap: unassigned enquiries are hidden. Run the tests to
          investigate.
        </p>
      )}
      {message && !adding && (
        <p role="status" className="notice">
          {message}
        </p>
      )}
      {adding && (
        <div className="modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
            className="modal"
          >
            <div className="section-heading">
              <h2 id="form-title">
                {editing ? "Edit enquiry" : "New enquiry"}
              </h2>
              <button
                aria-label="Close enquiry form"
                className="icon-button"
                onClick={() => setAdding(false)}
              >
                <X />
              </button>
            </div>
            <form onSubmit={save}>
              <div className="form-grid">
                {(
                  [
                    "name",
                    "email",
                    "course",
                    "owner",
                    "received",
                    "followUp",
                  ] as const
                ).map((k) => (
                  <label key={k}>
                    {
                      {
                        name: "Customer name",
                        email: "Contact email",
                        course: "Course",
                        owner: "Owner",
                        received: "Received date",
                        followUp: "Follow-up date",
                      }[k]
                    }
                    <input
                      autoFocus={k === "name"}
                      type={
                        k === "received" || k === "followUp" ? "date" : "text"
                      }
                      value={input[k]}
                      onChange={(e) =>
                        setInput({ ...input, [k]: e.target.value })
                      }
                    />
                  </label>
                ))}
              </div>
              <label>
                Notes
                <textarea
                  value={input.notes}
                  onChange={(e) =>
                    setInput({ ...input, notes: e.target.value })
                  }
                />
              </label>
              {message && (
                <p role="alert" className="warning">
                  {message}
                </p>
              )}
              <button className="primary" type="submit">
                Save enquiry
              </button>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
