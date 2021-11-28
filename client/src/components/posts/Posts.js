import '../../App.css';
import './Posts.css';

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

const UnjoinedPost = (props) => (
    <tr>
      <td>{props.post.name}</td>
      <td>{props.post.location}</td>
      <td>{props.post.participants.length + "/" + props.post.limit}</td>
      <td><a href="/dashboard" onClick={() => {props.joinPost(props.post._id)}}>Join</a></td>
    </tr>
);

const JoinedPost = (props) => (
    <tr>
      <td>{props.post.name}</td>
      <td>{props.post.location}</td>
      <td>{props.post.participants.length + "/" + props.post.limit}</td>
      <td><a href="/dashboard" onClick={() => {props.leavePost(props.post._id)}}>Leave</a></td>
    </tr>
);

const FullPost = (props) => (
    <tr>
      <td>{props.post.name}</td>
      <td>{props.post.location}</td>
      <td>{props.post.participants.length + "/" + props.post.limit}</td>
    </tr>
);

const UserCreatedPost = (props) => (
    <tr>
      <td>{props.post.name}</td>
      <td>{props.post.location}</td>
      <td>{props.post.participants.length + "/" + props.post.limit}</td>
      <td>
        <a href="/dashboard" onClick={() => {props.completePost(props.post.participants.length, props.post._id)}}>Complete | </a>
        <a href="/dashboard" onClick={() => {props.deletePost(props.post._id)}}>Delete</a>
      </td>
    </tr>
);

class Posts extends Component {
    constructor() {
        super();
        this.state = { 
            posts: [],
            eventname: "",
            eventlocation: "",
            eventlimit: 3
        };
        this.createPost = this.createPost.bind(this);
        this.joinPost = this.joinPost.bind(this);
        this.leavePost = this.leavePost.bind(this);
        this.completePost = this.completePost.bind(this);        
        this.deletePost = this.deletePost.bind(this);
    };

    componentDidMount() {
        axios
          .get("/api/posts/summary")
          .then((response) => {
            this.setState({ posts: response.data });
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    createPost() {
        if (this.state.eventname === "") {
            alert("Please enter an event name.");
            return;
        }

        if (this.state.eventlocation === "") {
            alert("Please enter an event location.");
            return;
        }

        if (this.state.eventlimit <= 0) {
            alert("Please set an event participant limit that is equal to or greater than 1.");
            return;
        }

        const newPost = {
            creator: this.props.auth.user.name,
            name: this.state.eventname,
            location: this.state.eventlocation,
            limit: this.state.eventlimit
        };
        axios.post("/api/posts/create", newPost).then(res => console.log(res)).then(window.location.reload());
    }

    joinPost(id) {
        const username = {
            name: this.props.auth.user.name
        }
        axios.post("/api/posts/join/" + id, username).then((response) => {
          console.log(response.data);
        });
    };

    leavePost(id) {
        const username = {
            name: this.props.auth.user.name
        }
        axios.post("/api/posts/leave/" + id, username).then((response) => {
            console.log(response.data);
        });
    };

    completePost(participants, id) {
        if (participants <= 0) {
            alert("You cannot complete an event with no participants. Try deleting instead.");
            return;
        };

        axios.post("/api/posts/complete/" + id).then((response) => {
            console.log(response.data);
        });
    };

    deletePost(id) {
        axios.delete("/api/posts/delete/" + id).then((response) => {
            console.log(response.data);
        });
    };

    postList() {
        return this.state.posts.map((currentPost) => {
            if (currentPost.creator === this.props.auth.user.name) {
                return (
                    <UserCreatedPost
                        post={currentPost}
                        completePost={this.completePost}
                        deletePost={this.deletePost}
                        key={currentPost._id}
                    />
                )
            }
            if (currentPost.participants.includes(this.props.auth.user.name)) {
                return (
                    <JoinedPost
                        post={currentPost}
                        leavePost={this.leavePost}
                        key={currentPost._id}
                    />
                )
            } 
            if (currentPost.participants.length >= currentPost.limit) {
                return (
                    <FullPost
                        post={currentPost}
                        key={currentPost._id}
                    />
                )
            }
            else {
                return (
                    <UnjoinedPost
                        post={currentPost}
                        joinPost={this.joinPost}
                        key={currentPost._id}
                    />
                )
            };
        });
    };

    render() {
        if (this.props.auth.user.access === "Admin") {
            return (
                <div className="Posts flex">
                    <div className="Posts-container flex">
                        <table className="PostList-table">
                            <thead>
                                <tr>
                                    <th className="table-item">Event Name</th>
                                    <th className="table-item">Event Location</th>
                                    <th className="table-item">Participants</th>
                                    <th className="table-item">Action</th>
                                </tr>
                            </thead>
                            <tbody>{this.postList()}</tbody>
                        </table>           
                    </div>
                    <form onSubmit={this.createPost} className="Event-form flex">
                        <h3>Create New Event</h3>
                        <label>Event Name</label>
                        <input id="eventname" className="Event-form-item" type="text" value={this.state.eventname} onChange={this.onChange} placeholder="Event Name" tabIndex="1"></input>
                        <label>Event Location</label>
                        <input id="eventlocation" className="Event-form-item" type="text" value={this.state.eventlocation} onChange={this.onChange} placeholder="Event Location" tabIndex="2"></input>
                        <label>Event Limit</label>
                        <input id="eventlimit" min="1" className="Event-form-item" type="number" value={this.state.eventlimit} onChange={this.onChange} placeholder="3" tabIndex="3"></input>
                        <button>Create Event</button>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="Posts flex">
                <div className="Posts-container flex">
                    <table className="PostList-table">
                        <thead>
                            <tr>
                                <th className="table-item">Event Name</th>
                                <th className="table-item">Event Location</th>
                                <th className="table-item">Rating</th>
                            </tr>
                        </thead>
                        <tbody>{this.postList()}</tbody>
                    </table>           
                </div>
            </div>
            )
        }
    }
}

Posts.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps)(Posts);
