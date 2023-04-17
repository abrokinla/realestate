import React, { useState } from "react";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import "../../styles/newproperty.css"
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../components/services/firebase.js';



const NewProperty = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [bed, setBed] = useState("");
    const [bath, setBath] = useState("");
    const [toilet, setToilet] = useState("");
    const [action, setAction] = useState("");
    const [status, setStatus] = useState("");
    const [rating, setRating] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [agent_id, setAgent_Id] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);

    const getAgentId = () => {
        const idToken = localStorage.getItem('idToken')
        const decodedToken = jwtDecode(idToken);        
        const { agent_id } = decodedToken;
        return agent_id;
    }

    const handleNewProperty = (e) => {
        e.preventDefault();
        const desc = description;
        const amt = amount;
        const loca = location;
        const numBed = bed;
        const numBath = bath;
        const numToilet = toilet;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 48a3534 (modifications on firebase)
        const act= action;
        const stat = status;
        const agtId = getAgentId();
        const propertyRating = "3";
        const imgurl = imgUrl;

        axios.post("http://localhost:5000/properties", {
            
            description : desc,
            amount : amt,
            location : loca,
            bed : numBed,
            bath : numBath,
            toilet : numToilet,
            action: act,
            status : stat,
            agent_id:  agtId,
            rating: propertyRating,
            img_url : imgurl,
            
        }, 
        {
            headers: {
                Authorization: localStorage.getItem('idToken')
            }
        })
        .then(res => { 
<<<<<<< HEAD
=======
        const act = action;
        const stat = status;
        const agtId = getAgentId();
        let propertyRating = "3";
        const imgurl = imgUrl;
      
        const idToken = localStorage.getItem('idToken');
        const decodedToken = jwtDecode(idToken);
        const isAdmin = decodedToken.is_admin;
      
        if (isAdmin === true) {
          propertyRating = "1";
        }
        
        console.log("urls", imgurl);
        axios.post("http://localhost:5000/properties", {
            description: desc,
            amount: amt,
            location: loca,
            bed: numBed,
            bath: numBath,
            toilet: numToilet,
            action: act,
            status: stat,
            agent_id: agtId,
            rating: propertyRating,
            img_url: imgurl,
          },
          {
            headers: {
              Authorization: idToken,
            },
          })
          .then(res => {
>>>>>>> publish
=======
>>>>>>> 48a3534 (modifications on firebase)
            alert('New Property Added')
            setDescription('');
            setAmount('');
            setLocation('');
            setBed('');
            setBath('');
            setToilet('');
            setAction('');
            setStatus('');
            setAgent_Id('');
            setRating('');
            setImgUrl('');
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 48a3534 (modifications on firebase)
        })
        .catch(error => {
        // If there is an error, display the error message
        console.error(error.response.data.error);
        });
    }    
<<<<<<< HEAD
=======
          })
          .catch(error => {
            // If there is an error, display the error message
            console.error(error.response.data.error);
          });
      }
      
>>>>>>> publish
=======
>>>>>>> 48a3534 (modifications on firebase)
   
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    }
    
    const handleDragOver = (e) => {
        e.preventDefault();
    }      
    
    const handleBrowseClick = () => {
        document.getElementById("file-input").click();
    }

    const handleFileInputChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 48a3534 (modifications on firebase)
        const downloadURLs = []; // array to store download URLs
        let overallProgress = 0;
      
        // create an array of promises for each file upload
        const uploadPromises = Array.from(selectedFiles).map(async (file) => {
          // create a reference to the file in Firebase Storage
          const fileRef = ref(storage, `images/${file.name}`);
      
          // upload the file to Firebase Storage
          const uploadTask = uploadBytesResumable(fileRef, file);
      
          // attach a progress listener to the upload task
          uploadTask.on('state_changed', 
            (snapshot) => {
                // update the progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                overallProgress += progress / selectedFiles.length;
                overallProgress = Math.min(overallProgress, 100); 
                setUploadProgress(overallProgress);
            },
            (error) => {
              // handle error
              console.error(error);
            },
            async () => {
              // get the download URL of the uploaded file
              const url = await getDownloadURL(fileRef);
              console.log('File download URL:', url);
      
              // add the download URL to the array
              downloadURLs.push(url);
      
            }
          );
      
          // return a promise that resolves when the upload is complete
          return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', resolve, reject);
          });
        });
      
        try {
          // wait for all upload tasks to complete
          await Promise.all(uploadPromises);
      
          // join the download URLs with a comma separator
          const urls = downloadURLs.join(',');
          setImgUrl(urls);
      
          // disable the upload button
          const uploadButton = document.getElementById('upload-button');
          uploadButton.disabled = true;
          
        } catch (error) {
          // handle error
          console.error(error);
        }
      };
      
      
<<<<<<< HEAD
=======
        const urls = [];

        try {
            // create an array of promises for each file upload
            const uploadPromises = Array.from(selectedFiles).map((file) => {
                // create a reference to the file in Firebase Storage
                const fileRef = ref(storage, `images/${file.name}`);

                // upload the file to Firebase Storage and return a promise that resolves with the download URL
                return new Promise(async (resolve, reject) => {
                    try {
                        const snapshot = await uploadBytesResumable(fileRef, file);
                        const url = await getDownloadURL(fileRef);
                        console.log('File download URL:', url);
                        urls.push(url);
                        resolve(url);
                    } catch (error) {
                        console.error(error);
                        reject(error);
                    }
                });
            });
        
            // wait for all upload tasks to complete
            await Promise.all(uploadPromises);

            console.log('All download URLs:', urls);
            const joinedUrls = urls.join(',');
            console.log('All URLs:', joinedUrls);
            setImgUrl(joinedUrls);

            // disable the upload button
            const uploadButton = document.getElementById('upload-button');
            uploadButton.disabled = true;

            // return the array of download URLs
            return urls;

        } catch (error) {
            console.error(error);
        }
    };

>>>>>>> publish
=======
>>>>>>> 48a3534 (modifications on firebase)
    return (
        <section id="main-container">
            <section id="main-form-container">
                <section id="form-contana">
                    <h1>Add New Property</h1>
                    <form id="new-property-form">        
                        <div className="input-field">
                            <label> Description:
                                <textarea maxLength="120"
                                    name="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="input-field">
                            <label>Amount:
                                <input
                                    type="number"
                                    name="amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="input-field">                        
                            <label>Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </label>
                        </div>

                        <section id="form-group">
                            <div className="input-field">                        
                                <label>Number of bedrooms:
                                    <select name="bed" 
                                        value={bed} 
                                        onChange={e => setBed(e.target.value)}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>
                                </label>
                            </div>

                            <div className="input-field">
                                <label>Number of bathroom:
                                    <select name="bath" 
                                        value={bath} 
                                        onChange={e => setBath(e.target.value)}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>
                                </label>
                            </div>

                            <div className="input-field">
                                <label>Number of toilet:
                                    <select name="toilet" 
                                        value={toilet} 
                                        onChange={e => setToilet(e.target.value)}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>                    
                                </label>
                            </div>
                        </section>

                        <div className="input-field">
                            <label>Property for:
                                <select name="action" id="action" onChange={e => setAction(e.target.value)}>
                                    <option value="">Choose option</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Sale">Sale</option>
                                    <option value="Rent/Sale">Rent/Sale</option>
                                </select>
                            </label>
                        </div>    

                        <section id="form-group">
                            <div className="input-field">
                                <label>Status of property:
                                    <div id="status-cont">
                                        <input 
                                            type="radio" 
                                            id="status-new"
                                            name="status" 
                                            value="New"
                                            onChange={e => setStatus(e.target.value)}
                                        />
                                        <label htmlFor="status-new" >New</label>
                                        <input 
                                            type="radio" 
                                            id="status-renovated"
                                            name="status" 
                                            value="Renovated"
                                            onChange={e => setStatus(e.target.value)}
                                        />
                                        <label htmlFor="status-renovated" >Renovated</label>                    
                                    </div>
                                </label>
                            </div>                        
                        </section>
                            <p id="images-label">Add images</p>
                            <div className="draggable-item" draggable={true} onDragStart={handleDragStart} onDragOver={handleDragOver} onClick={handleBrowseClick}>
                                <span>Drag files here</span>
                                <div className="browse-item" onClick={handleBrowseClick}>
                                <span><em>or click to browse</em></span>
                                </div>
                                <input type="file" id="file-input" accept="image/*" onChange={handleFileInputChange} multiple />
                            </div>
                            {selectedFiles && (
                                <div>
                                {Array.from(selectedFiles).map((file) => (
                                    <div key={file.name} style={{ fontSize: '10px' }}>
                                    {file.name} ({uploadProgress || '0'}%)
                                    </div>
                                ))}
                                <button id="upload-button" onClick={(e) => handleUpload(e)}>Upload</button>
                                </div>
                            )}                     

                        <div className="action">
                            <input type="submit" value="Submit" id="add-new-property" onClick={handleNewProperty} />                            
                        </div>

                    </form>
                </section>
            </section>
        </section>
    )
}

export default NewProperty;