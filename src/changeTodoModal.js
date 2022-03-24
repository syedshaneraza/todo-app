import React, { useEffect,useRef } from "react";
import { Modal } from "bootstrap";

function ChangeTodoModal({isOpen, setIsOpen, sendValueToEdit, getTodoValue, sendIdToEdit}) {
  const modalRef = useRef();
  const overwriteValue = (id) => {
    let some = document.getElementById('valueToEdit').value;
    let strToNum = document.getElementById('idToEdit').value;
    let ind = parseInt(strToNum, 10);
    getTodoValue(some, ind);
  }
  
  useEffect(() => {
    if (!isOpen) return;
    const myModal = modalRef.current 
    let bsModal = Modal.getInstance(myModal)
    
    if (!bsModal) {
        bsModal = new Modal(myModal)
        bsModal.show()
        myModal.addEventListener("hide.bs.modal", () => {
          setIsOpen(false)
        })
    }
    else {
      isOpen ? bsModal.show() : bsModal.hide()
    }
  },[isOpen])

  return ( 
    <div id="myModal" className="modal" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Todo Title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type="text" defaultValue={sendValueToEdit} id="valueToEdit"></input>
          </div>
          <input type="hidden" name="action" id="idToEdit" value={sendIdToEdit}/>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" 
            onClick={()=>{overwriteValue()}}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeTodoModal;
