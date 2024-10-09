import React, { useState } from "react";
import Cookies from "js-cookie";
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


    const handleNewProperty = (e) => {
        e.preventDefault();
        
        // Get the token from cookies
        const idToken = Cookies.get('idToken');
        console.log(idToken)
        if (!idToken) {
            console.error('No token found');
            return; // Handle error as needed
        }
    
        // Decode the token to get agent details and user role
        const decodedToken = jwtDecode(idToken);
        const agtId = decodedToken.agent_id;
        const userRole = decodedToken.user_role; // Extract user_role
        const isAdmin = decodedToken.is_admin;   // Extract is_admin
        
        // Ensure all necessary fields are properly set
        const desc = description;
        const amt = amount;
        const loca = location;
        const numBed = bed;
        const numBath = bath;
        const numToilet = toilet;
        const act = action;
        const stat = status;
        const imgurl = imgUrl;
    
        // Set the property rating based on user role or is_admin flag
        let propertyRating = "3"; // Default rating for regular agents
        if (isAdmin === true) {
            propertyRating = "1"; // Admin rating
        }
            
        // Make the POST request to create the new property
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
            user_role: userRole,
            rating: propertyRating,
            img_url: imgurl,
        }, {
            headers: {
                Authorization: `${idToken}`, // Ensure the token is sent in the right format
            },
        })
        .then(res => {
            alert('New Property Added');
            
            // Reset all form fields after successful submission
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
        })
        .catch(error => {
            // Handle any errors from the request
            console.error(error.response?.data?.error || "An error occurred");
        });
    
    };
    
      
   
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
    
        try {
            if (!selectedFiles) {
                console.error('No files selected for upload');
                return;
            }
    
            // Create an array of promises for each file upload
            const uploadPromises = Array.from(selectedFiles).map((file, index) => {
                // Create a reference to the file in Firebase Storage
                const fileRef = ref(storage, `images/${file.name}`);
    
                // Upload the file to Firebase Storage with progress tracking
                return new Promise((resolve, reject) => {
                    const uploadTask = uploadBytesResumable(fileRef, file);
    
                    // Listen for state changes, including progress updates
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Calculate progress in percentage
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload progress for file ${index + 1}: ${progress}%`);
                            
                            // Update the progress state if needed
                            setUploadProgress(Math.round(progress));
                        },
                        (error) => {
                            // Handle upload error
                            console.error(`Error uploading file ${file.name}:`, error);
                            reject(error);
                        },
                        async () => {
                            // Handle successful upload, get download URL
                            try {
                                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                                resolve(downloadUrl);
                            } catch (urlError) {
                                console.error(`Error getting download URL for file ${file.name}:`, urlError);
                                reject(urlError);
                            }
                        }
                    );
                });
            });
    
            // Wait for all upload tasks to complete
            const urls = await Promise.all(uploadPromises);
    
            console.log('All download URLs:', urls);
            const joinedUrls = urls.join(',');
            setImgUrl(joinedUrls);
    
            // Disable the upload button
            const uploadButton = document.getElementById('upload-button');
            uploadButton.disabled = true;
    
            // Return the array of download URLs
            return urls;
    
        } catch (error) {
            console.error('Error in handleUpload:', error);
        }
    };
    

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