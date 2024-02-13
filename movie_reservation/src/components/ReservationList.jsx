import React, { useState } from 'react'
import '../stylesheets/ReservationList.css';

export const ReservationList = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); 
    const [information, setInformation] = useState([
        { id: 1, name: 'Alita' },
        { id: 2, name: 'The Dark Night' },
        { id: 3, name: 'The God Father' },
        { id: 4, name: 'The Shawshank Redemption' },
        { id: 5, name: 'Alita' },
        { id: 6, name: 'The Dark Night' },
        { id: 7, name: 'The God Father' },  
        { id: 8, name: 'The Shawshank Redemption' },
        { id: 9, name: 'Alita' },
        { id: 10, name: 'The Shawshank Redemption' },
        { id: 11, name: 'The Shawshank Redemption' },
        { id: 12, name: 'The Shawshank Redemption' },
        { id: 13, name: 'The Shawshank Redemption' },
        { id: 14, name: 'The Shawshank Redemption' },
    ]);

    // const deleteInformation = (id) => {
    //     setInformation(information.filter(item => item.id !== id));
    // }

    const toggleModal = (id) => 
    {
        if (id) 
        {
          setSelectedItemId(id);
        }
        setShowModal(!showModal);
    };
    
      
    const deleteInformation = (id) => 
    {
        setInformation(information.filter(item => item.id !== id));
        toggleModal(); // Close modal after deletion
    };

    return (
        <div className='container'>
            <div className='titleContainer'>
                <h3 className='title'>Reservation List</h3>
            </div>
            <ul className='listContainer'>
                {information.map(item => (
                    <div>
                        <li className='list' key={item.id}>id: {item.id} name: {item.name}
                        <button className='deleteButton' onClick={() => toggleModal(item.id)}>Delete</button>
                        </li>
                    </div>
                ))}
            </ul>

            {showModal && (
                <div className='modal'>
                    <div className='modalContent'>
                        <p className='deleteStatement'>Are you sure you want to delete this item?</p>
                        <div className='deleteModalButton'>
                        <button className = "yesButton" onClick={() => deleteInformation(selectedItemId)}>Yes</button>
                        <button className = "noButton" onClick={toggleModal}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}


export default ReservationList;