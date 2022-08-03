import React, { useState } from 'react';
import { CheckBox } from '@rneui/themed';

const Checkbox = () => {
    const [check1, setCheck2] = useState(false);
    return (
    <>
        <CheckBox
        center
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check1}
        onPress={() => setCheck2(!check1)}
        />
    </>
    );
};

export default Checkbox;