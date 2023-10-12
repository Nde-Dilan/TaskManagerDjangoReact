import React, { Component } from "react";
import "./App.css";
import CustomModal from "../src/components/Modal";
import axios from "axios";
//TODO: Add other functianaliies and refactor the code

/*const tasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Write a detailed project proposal document.",
    is_completed: false,
  },
  {
    id: 2,
    title: "Prepare Presentation",
    description: "Create a presentation for the project kickoff meeting.",
    is_completed: true,
  },
  {
    id: 3,
    title: "Research Market Trends",
    description: "Gather information on current market trends.",
    is_completed: false,
  },
  {
    id: 4,
    title: "Design User Interface",
    description: "Create wireframes and mockups for the application's UI.",
    is_completed: false,
  },
  {
    id: 5,
    title: "Develop Backend API",
    description: "Build the backend API for data communication.",
    is_completed: false,
  },
  {
    id: 6,
    title: "Test Application Functionality",
    description: "Perform thorough testing of the application's features.",
    is_completed: false,
  },
  {
    id: 7,
    title: "Write User Documentation",
    description: "Prepare user guides and documentation for the application.",
    is_completed: false,
  },
  {
    id: 8,
    title: "Deploy to Production",
    description: "Deploy the application to the production server.",
    is_completed: false,
  },
  {
    id: 9,
    title: "Client Meeting",
    description:
      "Schedule a meeting with the client to discuss project progress.",
    is_completed: false,
  },
  {
    id: 10,
    title: "Finalize Project",
    description: "Conclude all remaining tasks and deliver the project.",
    is_completed: false,
  },
];*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      viewCompleted: false,
      taskList: [],
      activeItem: {
        title: "",
        description: "",
        is_completed: false,
      },
    };
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    } else {
      return this.setState({ viewCompleted: false });
    }
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((res) => this.setState({ taskList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
    }
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    console.log(item);
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>

        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  //Rendering items in the list
  renderItems = () => {
    const { viewCompleted } = this.state;
    console.log(viewCompleted);
    const newItems = this.state.taskList.filter(
      (item) => item.is_completed === viewCompleted
    );
    console.log(newItems);

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`task-title my-2 ${
            this.state.viewCompleted ? "completed-task" : ""
          }`}
          title={item.description}
        >
          {item.description}
        </span>
        <span>
          <button
            className="btn btn-info mx-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">
          task manager
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto">
            <div className="card p-3">
              <div>
                <button className="btn btn-dark" onClick={this.toggle}>
                  Add Task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-5 mb-2 bg-info text-white text-center">
          Copyright 2023 &copy; All rights Reserved
        </footer>
        {this.state.modal ? (
          <CustomModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
