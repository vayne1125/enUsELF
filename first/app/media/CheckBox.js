import React, { useState } from 'react';
import { CheckBox } from '@rneui/themed';

const Checkbox = ({check}) => {
    const [check1, setCheck1] = useState(false);//內部
    console.log('sendch ',check);
    console.log('ch ',check1);
    return (
    <>
        <CheckBox
        center
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check1}
        onPress={() => setCheck1(!check1)}
        />
    </>
    );
};

export default Checkbox;