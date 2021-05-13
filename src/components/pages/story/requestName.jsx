import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {withRouter} from 'react-router-dom';

import firebase from '../../../config/firebase';
import {addStoryDetails} from "../../../actions";
import '../../../styles/css/home.css';

function requestName(props) {
    const storyID = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {

        firebase.firestore()
            .collection('stories')
            .doc(storyID)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    const confirm = window.confirm("can't find a story on this id");
                    if (confirm) {
                        props.history.push(`/`);
                    } else {
                        props.history.push(`/`);
                    }
                }
            }).catch(error => {
            console.log(error);
        })
    }, []);

    function formSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        dispatch(
            addStoryDetails({name: name})
        );
        props.history.push(`/story/${storyID}`);
    }

    return (
        <>
            <div className="home-container">
                <div className="home-content-container">
                    <div className="row home-form">
                        <div className="col-12">
                            <form onSubmit={formSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" required name="name"
                                           placeholder="Enter your name"/>
                                </div>
                                <button type="submit" className="btn btn-outline-primary btn-block">Join Story</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(requestName);