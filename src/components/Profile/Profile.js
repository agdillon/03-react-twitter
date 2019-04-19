import React, { Component } from "react";
import ProfileAvatar from "./ProfileAvatar";
import AvatarDialog from "./AvatarDialog";
import { getMessages } from "../../api/messageApi";
import "./Profile.css";
import { addUsersStars } from "../../Utilities/userUtilities";
import { connect } from "react-redux";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "https://via.placeholder.com/150x150",
      name: "Paul",
      handle: "@jack",
      message_count: 0,
      star_count: 0,
      bio: "Front end dev located in Denver",
      location: "Denver, CO",
      link: "github.com/git",
      birth_date: "03/02/1999",
      dialog_open: false
    };
  }

  componentDidMount() {
    this.initializeUserDashboard();
  }

  initializeUserDashboard = () => {
    getMessages().then(res => {
      if (res && res.data) {
        this.setState({
          star_count: addUsersStars(res.data),
          message_count: res.data.length,
          messages: this.renderMessageItem(res.data)
        });
      }
    });
  };

  renderMessageItem = messagesList => {
    return messagesList
      .filter(message => {
        return message.user_id === this.props.userId;
      })
      .reduce((accu, message, index) => {
        accu.push(<li key={index}>--- {message.text}</li>);
        return accu;
      }, []);
  };

  avatarClicked = e => {
    e.preventDefault();
    console.log("The link was clicked.");
  };

  changeAvatar = url => {
    console.log("Changing avatar");
    this.setState({ avatar: url });
  };

  handleUpStarClick = (e) => {
    e.preventDefault();
    console.log(e.target.attributes.messageid.value);
    let messageid = e.target.attributes.messageid.value;

    addStarToMessage(messageid).then((res) => {
      console.log(res);
      this.initializeUserDashboard();
    });

  }

  render() {
    // this.initializeUserDashboard();
    return (
      <div className="ProfileContainer">
        <div className="ProfileHeader">
          <ProfileAvatar
            onClick={this.avatarClicked}
            image={this.state.avatar}
          />
          <h1 data-handle={`@${this.props.user.handle}`} className="handle">
            {this.props.user.name}
          </h1>
          <ul className="InfoList">
            <li>messages: {this.state.message_count}</li>
            <li>likes: {this.state.star_count}</li>
          </ul>
        </div>
        <div className="InfoContainer">
          <p>{this.props.user.bio}</p>

          <ul className="InfoList">
            <li>{this.props.user.location}</li>
            <li>{this.props.user.link}</li>
            <li>{this.props.user.birth_date}</li>
          </ul>
        </div>
        <AvatarDialog changeAvatar={this.changeAvatar} />
        <div className="messageView">
          <h2>
            {this.props.user.name}
            's Message List
          </h2>
          <ul>
            {this.props.userId
              ? this.state.messages
              : "please log in to view messages"}
          </ul>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userId: state.user.id,
  user: state.user
});

export default connect(mapStateToProps)(Profile);
