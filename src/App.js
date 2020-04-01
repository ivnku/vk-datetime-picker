import React from 'react';
import './vk_datetime_picker/VkDatetimePicker';
import VkDatetimePicker from './vk_datetime_picker/VkDatetimePicker';

function App() {

    return (
        <div className="App" style={{height:100 + '%'}}>
            <VkDatetimePicker onSave={() => console.log("TODO on save")} />
        </div>
    );
}

export default App;
