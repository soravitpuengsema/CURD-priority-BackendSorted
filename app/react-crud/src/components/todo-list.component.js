import React,{Component} from "react";
import TodoListDataService from "../services/todo.service";
import {Link} from "react-router-dom";
import goldstar from "./goldstar.png";
import blackstar from "./blackstar.png";

export default class TodoList extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.updatePriority = this.updatePriority.bind(this);

        this.state ={
            tutorials:[],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle:""
        };
    }

    componentDidMount(){
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e){
        const searchTitle = e.target.value;
        this.setState({
            searchTitle : searchTitle
        });
    }

    retrieveTutorials(){
        TodoListDataService.getAll()
        .then(response =>{
            this.setState({
                tutorials:response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        })
    }

    removeAllTutorials(){
        TodoListDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList(){
        this.retrieveTutorials();
        this.setState({
            currentTutorial:null,
            currentIndex:-1
        });
    }

    setActiveTutorial(tutorial,index){
        this.setState({
            currentTutorial: tutorial,
            currentIndex:index
        });
    }

    searchTitle(){
        TodoListDataService.findByTitle(this.state.searchTitle)
        .then(response =>{
            this.setState({
                tutorials:response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    updatePriority(tutorial) {
        var data = {
            id: tutorial.id,
            title: tutorial.title,
            desciption: tutorial.description,
            published: tutorial.published,
            priority: !tutorial.priority
        };
        TodoListDataService.update(tutorial.id, data)
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){
        const {searchTitle,tutorials,currentIndex,currentTutorial} = this.state;
        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type='text'
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                             className="btn btn-outline-secondary"
                             type = "button"
                             onClick={this.searchTitle}
                            >
                            Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Todo List</h4>
                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial,index)=>(
                                <li
                                className={"list-group-item"+
                                (index === currentIndex ? " active":"")
                                }
                                onClick={()=> this.setActiveTutorial(tutorial,index)}
                                key={index}
                                >
                                <div>
                                {tutorial.priority ? (
                                    <button
                                    id = {"gold"}
                                    className={"star"}
                                    onClick={() => this.updatePriority(tutorial)}
                                    >
                                    <img src={goldstar} style={{width:20,heigth:20}}/>
                                    </button>
                                ) : (
                                    <button
                                    id = {"black"}
                                    className={"star"}
                                    onClick={() => this.updatePriority(tutorial)}
                                    >
                                    <img src={blackstar} style={{width:20,heigth:20}}/>
                                    </button>
                                )}
                                {tutorial.title}
                                </div>
                                </li> 
                            ))}
                    </ul>
                    <button 
                     className="m-3 btn btn-sm btn-danger"
                     onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ?(
                        <div>
                            <h4>Todo</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>

                                </label>{" "}
                                {currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.published ? "Published": "Pending"}
                            </div>
                            <div>
                                <label>
                                    <strong>Priority:</strong>
                                </label>{" "}
                                {currentTutorial.priority ? "True": "False"}
                            </div>
                            <Link
                             to={"/todo/"+currentTutorial.id}
                             className="badge badge-warning"
                            //  style={{color: "black"}}
                            >
                            Edit
                            </Link>
                        </div>

                    ) :(
                        <div>
                            <br/>
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}