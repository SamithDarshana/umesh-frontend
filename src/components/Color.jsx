import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Color = (props) => {
  const { colors, setColor } = props;
  const [clicked, setClicked] = useState(null);
  const dispatch = useDispatch();


  const handleClick = (id) => {
    if (clicked === id) {
      setClicked(null);
      setColor(null);
    } else {
      setClicked(id);
      setColor(id);
    }
  }
  return (
    <>
      <ul className="colors ps-0">
        {colors && colors.map((item, index) => (
          <li className={clicked === item._id ? 'clicked' : ''} key={index} style={{ backgroundColor: item?.title }} onClick={() => handleClick(item?._id)}></li>
        ))}
      </ul>
    </>
  );
};

export default Color;
