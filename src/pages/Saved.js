
import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import { getUserData } from '../store/actions/Auth';
import { IoBookmarkOutline } from 'react-icons/io5'





function Saved() {
  const dispatch = useDispatch()
  const userId = JSON.parse(localStorage.userId).userId


  useEffect(() => {
    dispatch(getUserData())
  }, [])
  const data = useSelector(state => state.Auth.userData)
  const userFilter = data.filter(obj => obj.userId == userId)
  const map = userFilter.map(i => i.saved)[0]

  const list = [];
  for (let key in map) {
    list.push({
      postId: map[key].postId,
      loadImg: map[key].loadImg,
    })
  }
  console.log(list)
  const renderSavedPost = list.map(i => <Link key={i.postId} to={`/p/${i.postId}`}><div style={{ backgroundImage: `url(${i.loadImg})`, width: '200px', height: '200px', margin: '5px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',border:'1px solid lightgrey',borderRadius:5 }} ></div></Link>)

  return (
    <div >
      <p style={{ margin: 20, fontSize: 12, color: 'grey' }}>Solo tu puoi vedere gli elementi che hai salvato</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderSavedPost == '' ?

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%',marginTop:200 }}>

            <div style={{ border: '1px solid black', width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100%' }}>
              <IoBookmarkOutline size={'30px'} />
            </div>
            <div style={{ width: 400, textAlign: 'center', }}>


              <p style={{ fontSize: 30, fontWeight: 300,margin:10 }}>Salva</p>
              <p style={{fontSize:16,fontWeight:200}}>
                Salva le foto e i video che desideri rivedere. Nessuno riceverà una notifica e solo tu potrai vedere cosa hai salvato.
              </p>
            </div>

          </div>

          : renderSavedPost}
      </div>

    </div>


  )
}

export default Saved