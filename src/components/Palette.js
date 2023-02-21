import { useEffect, useState } from "react";
import addImg from '../pics/add.png';
import editImg from '../pics/pencil.png';
import { updateColor } from "../firebase/firestore";

function Palette({ userSelection, setUserSelection, handleColor, setShowPalette, handleEdit, id, setId, queryColors,setLoading }) {

    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    const mode = id ? true : false;
    const [editMode, setEditMode] = useState(mode);

    const addColor = () => {
        setLoading(true);
        handleColor();
        setBlue(0);
        setRed(0);
        setBlue(0);
        setShowPalette(false);
    }

    const editColor = async () => {
        setLoading(true)
        let status = await updateColor(id, userSelection);
        if (status) {
            queryColors();
        }
        setBlue(0);
        setRed(0);
        setBlue(0);
        setShowPalette(false);
        setId(null);
        setUserSelection(null);
    }

    useEffect(() => {
        if (userSelection) {
            let values = userSelection.replace('rgb', '').replace('(', '').replace(')', '').split(',')
            setRed(parseInt(values[0]));
            setGreen(parseInt(values[1]));
            setBlue(parseInt(values[2]));
        }
    }, [])


    useEffect(() => {
        setUserSelection(`rgb(${red},${green},${blue})`);
    }, [red, green, blue])

    return (
        <div className="paletteBox">
            <div className="visibleColor" style={{ backgroundColor: userSelection }}>

            </div>
            <div>
                <div className="red point" />
                <input

                    type={"range"}
                    min={0} max={255}
                    value={red}
                    onChange={(e) => setRed(parseInt(e.target.value))}
                />
            </div>
            <div>
                <div className="green point" />
                <input
                    type={"range"}
                    min={0} max={255}
                    value={green}
                    onChange={(e) => setGreen(parseInt(e.target.value))}
                />
            </div>
            <div>
                <div className="blue point" />
                <input
                    type={"range"}
                    min={0} max={255}
                    value={blue}
                    onChange={(e) => setBlue(parseInt(e.target.value))}
                />
            </div>
            {
                editMode
                    ?
                    <img src={editImg} alt={"edit"} onClick={editColor} />
                    :
                    <img src={addImg} onClick={addColor} id="add" />}
        </div>
    )
}

export default Palette;