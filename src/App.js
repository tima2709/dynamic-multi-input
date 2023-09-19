import React from 'react';
import TourList from "./components/customInput/tourList";
import MultipleImage from "./components/customInput/multipleImage";
import AccommodationsTourList from "./components/customInput/accommodationsTourList";
import DinamicInput from "./components/customInput/dinamicInput";
import DynamicDaysInput from "./components/customInput/dynamicDaysInput";

const App = () => {
    return (
        <div className={'App'}>
            {/*<Cards/>*/}
            <DynamicDaysInput/>
        </div>
    );
};

export default App;