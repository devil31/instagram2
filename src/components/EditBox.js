import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Styles/EditBox.css'
import { updateUserData } from '../store/actions/ChangeUserData';
import { getUserData } from '../store/actions/Auth';
import { fetchPost } from '../store/actions/Post';
import { changeImageProfile } from '../store/actions/ChangeUserData';
import { Spinner } from 'react-bootstrap';


function EditBox() {

  



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [numb, setNumb] = useState('');
    const [loadImg, setLoadImg] = useState('')
    const [selectedOption, setSelectedOption] = useState('uomo');
    const userId = JSON.parse(localStorage.getItem('userId')).userId

    const userData = useSelector(state => state.Auth.userData)
    const loadingImage = useSelector(state=>state.ChanUserData.loading)

    const filter = userData.filter(obj => obj.userId == userId)

    const myUserKey =filter && filter.map(i => i.key)[0];
    const ProfileImg = filter.map(i => i.profileImg)

   console.log(loadingImage)

    const dispatch = useDispatch()


 useEffect(()=>{
     dispatch(getUserData())
     
     if(loadImg){
         dispatch(changeImageProfile(myUserKey,loadImg))
     }
 },[loadImg])
 
    const imageHandler = async (e) => {
        const reader = new FileReader();
        reader.onload = async () => {
            if (reader.readyState === 2) {
                setLoadImg(reader.result)

            }
        }
   reader.readAsDataURL(e.target.files[0]) 
 

    }


    const handleData = async () => {
         dispatch(updateUserData(name, email, numb, selectedOption, myUserKey, loadImg))

    }


  

    return (
        <div className='ContainerBox'>
            <div className='Box_left'>
                <Link to={'/accounts/edit'}>Modifica Profilo</Link>
                <Link to={'/accounts/change'}>Modifica Password</Link>

            </div>
            <div className='Box_right'>

                <div style={{ display: 'flex', width: '100%', height: '100px', alignItems: 'center', justifyContent: 'center' }}>
{loadingImage ? <Spinner animation='border' style={{marginRight:25}}/>:<span className='BoxR_avatar' style={ { backgroundImage: `url(${ProfileImg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover' }}></span>}
                    
                    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* // <span>{filter.username}</span> */}
                        <label htmlFor='file-upload' style={{ cursor: 'pointer' }}  >Cambia immagine profilo</label>
                        <input style={{ display: 'none' }} id='file-upload' type={'file'} onChange={imageHandler} ></input>
                    </div>


                </div>

                <div className='BoxR_form'>

                    <div>
                        <div>Nome</div>
                        <input required type={'text'} value={name} placeholder='Nome' onChange={(e) => setName(e.target.value)} />

                    </div>
                    <div>
                        <div>E-mail</div>
                        <input required type={'text'} value={email} placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <div>Numero di telefono</div>
                        <input required type={'number'} value={numb} placeholder="Numero di telefono" onChange={(e) => setNumb(e.target.value)} />
                    </div>
                    <div>
                        <div>Genere</div>
                        <select onChange={(e) => {
                            const selectedMan = e.target.value;
                            setSelectedOption(selectedMan)
                        }}>
                            <option >uomo</option>
                            <option >donna</option>
                        </select>
                    </div>
                    <button onClick={handleData} >invia</button>







                </div>

            </div>



        </div>
    )
}

export default EditBox