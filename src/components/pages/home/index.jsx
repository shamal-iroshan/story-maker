import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {withRouter} from 'react-router-dom';

import firebase from '../../../config/firebase';
import {addStoryDetails} from "../../../actions";
import '../../../styles/css/home.css';

function home(props) {

    const dispatch = useDispatch();
    const [type,setType] = useState(true);

    function formSubmit(event) {
        event.preventDefault();
        let data = {
            story: []
        }
        if (type) {
            data.name = event.target.elements.name.value;
            data.storyName = event.target.elements.storyName.value;

            const firestore = firebase.firestore();

            firestore.collection('stories').add({
                ...data,
                dateTime: new Date().toISOString()
            }).then(docRef => {
                data.id = docRef.id;
                dispatch(addStoryDetails(data));
                props.history.push(`/story/${data.id}`);
            }).catch(error => {
                console.log(error);
            });

        } else {
            data.name = event.target.elements.name.value;
            data.storyCode = event.target.elements.storyCode.value;

            dispatch(addStoryDetails(data));
            props.history.push(`/story/${data.storyCode}`);
        }
    }

    return (
        <>
            <div className="home-container">
                <div className="home-content-container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 text-center text-secondary">
                            <h4 className={!type ? 'd-none' : ''}>New Story</h4>
                        </div>
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center">
                            <label className="switch">
                                <input type="checkbox" onChange={() => {setType(!type)}}/>
                                <span className="slider"/>
                            </label>
                        </div>
                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 text-center text-secondary">
                            <h4 className={type ? 'd-none' : ''}>Join Story</h4>
                        </div>
                    </div>
                    <div className="row home-form">
                        <div className="col-12">
                            <form onSubmit={formSubmit}>
                            {
                                type ?
                                    <>
                                        <div className="form-group">
                                            <input type="text" className="form-control" required name="name" placeholder="Enter your name"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" required name="storyName" placeholder="Enter story title"/>
                                        </div>
                                        <button type="submit" className="btn btn-outline-primary btn-block">Start Story</button>
                                    </>
                                    :
                                    <>
                                        <div className="form-group">
                                            <input type="text" className="form-control" required name="name" placeholder="Enter your name"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" required name="storyCode" placeholder="Enter story code"/>
                                        </div>
                                        <button type="submit" className="btn btn-outline-primary btn-block">Join Story</button>
                                    </>
                            }
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(home);