import { useEffect, useState } from "react";
import { logout } from "../firebase/auth";
import { addColor, deleteColor, getColors, updateColor } from "../firebase/firestore";
// import Loading from 'react-loading-components';
import Palette from "./Palette";

import pencilImg from '../pics/pencil.png';
import removeImg from '../pics/remove.png';
import addButton from '../pics/add-plain.png';

function Home({ activeUser, setActiveUser }) {
    const [userSelection, setUserSelection] = useState(null);
    const [colors, setColors] = useState([]);

    const [showPalette, setShowPalette] = useState(false);
    const [id, setId] = useState(null);

    const [loading, setLoading] = useState(false);

    const queryColors = async () => {
        let data = await getColors(activeUser);
        if (data) {
            setLoading(false);
            setColors(data);
        }
    }

    useEffect(() => {
        setLoading(true);
        queryColors();
    }, [])

    const handleColor = async () => {
        if (userSelection) {
            await addColor(activeUser, userSelection);
            setUserSelection('');
            queryColors();
        }
    }

    const handleLogout = async () => {
        let loggedOut = await logout();
        if (loggedOut) {
            localStorage.clear();
            setActiveUser(null);
        }
    }



    const handleEdit = async (id, color) => {
        setShowPalette(true);
        setUserSelection(color);
        setId(id);
    }

    const handleDelete = async (id) => {
        setLoading(true);
        let status = await deleteColor(id);
        if (status) {
            queryColors();
        }
    }


    if (loading) {
        return (
          <div className='loader'>
            {/* <Loading type='ball_triangle' width={200} height={200} fill='#f44242' /> */}
          </div>
        )
      }

    return (
        <div className="home">
            <div className="main">
                {showPalette
                    ?
                    <Palette
                        id={id}
                        setId={setId}
                        userSelection={userSelection}
                        setUserSelection={setUserSelection}
                        handleColor={handleColor}
                        handleEdit={handleEdit}
                        setShowPalette={setShowPalette}
                        queryColors={queryColors}
                        setLoading={setLoading}
                    />
                    :
                    <div className="collection">
                        {colors.map(color => {
                            return (
                                <div
                                    className="box"
                                    key={`color-${color.id}`}
                                >
                                    <div className="colori" style={{ backgroundColor: color.value }} />
                                    <div className="buttons" >
                                        <img
                                            src={pencilImg}
                                            alt="remove"
                                            onClick={() => handleEdit(color.id, color.value)}
                                        />
                                        <img
                                            src={removeImg}
                                            alt="remove"
                                            onClick={() => handleDelete(color.id)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <div className="center addBox" onClick={() => setShowPalette(true)}>
                            <img id="add-btn" src={addButton} alt={"add color"} />
                        </div>
                    </div>
                }
            </div>
            <div className="footer">
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Home;