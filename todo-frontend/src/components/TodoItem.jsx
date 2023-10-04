import { useContext } from "react";

import TodoContext from "../TodoContext";
export default function TodoItem({ title, description, completed, id }) {
  const { deleteTodos, markAsComplete } = useContext(TodoContext);

  return (
    <div className="accordion " id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collap${id}`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {title}
          </button>
        </h2>
        <div
          id={`collap${id}`}
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <p>{description}</p>

            <div className="row">
              <div className="col col-6">
                <button
                  onClick={() => {
                    deleteTodos(id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
              <div className="col col-6">
                <button
                  onClick={() => markAsComplete(id)}
                  className="btn btn-success"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
