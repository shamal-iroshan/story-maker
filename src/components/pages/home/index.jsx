import React, {useState} from 'react';

import fireStore from '../../../config/firebase';
import '../../../styles/css/home.css';

function home() {

    const [type,setType] = useState(true);

    function formSubmit(event) {
        event.preventDefault();
        let data = {}
        if (type) {
            data.name = event.target.elements.name.value;
            data.storyName = event.target.elements.storyName.value;
        } else {
            data.name = event.target.elements.name.value;
            data.storyCode = event.target.elements.storyCode.value;
        }

        fireStore.collection('stories').add({
            ...data,
            dateTime: new Date().toISOString()
        }).then(docRef => {
            data.id = docRef.id;
            localStorage.setItem('storyDetails', JSON.stringify(data));
        }).catch(error => {
            console.log(error);
        });

        // fireStore.collection('stories').doc('NgWXRktY4lHGjftfLSGI').update({2: {name: 'shamal', time: new Date(), data: 'sdfeffeffeffrefefefeffeefeffeedgtrgrgghrthgththtrrgrfgfghgthgtwthgtht'}}).then(() => {
        //     console.log('updated')
        // }).catch(error => {
        //     console.log(error);
        // });
    }

    return (
        <>
            <div className="home-container">
                <div className="home-content-container">
                    <div className="row">
                        <div className="col-5 text-center text-secondary">
                            <h4 className={!type ? 'd-none' : ''}>New Story</h4>
                        </div>
                        <div className="col-2 text-center">
                            <label className="switch">
                                <input type="checkbox" onChange={() => {setType(!type)}}/>
                                <span className="slider"/>
                            </label>
                        </div>
                        <div className="col-5 text-center text-secondary">
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

export default home;