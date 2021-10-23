import './App.css';
import {useEffect, useState} from "react";

const getLocalData = JSON.parse(localStorage.getItem('allCountryList'))

function App() {
    const [allCountryList, setAllCountryList] = useState(getLocalData ? getLocalData : []);
    const defaultCountryDetails = {
        countryName: '',
        state: []
    }
    const defaultStateDetails = {
        stateName: '',
        city: []
    }
    const defaultCityDetails = {
        cityName: ''
    }

    useEffect(() => {
        localStorage.setItem('allCountryList', JSON.stringify(allCountryList))
    }, [allCountryList])

    const onAddCountry = () => {
        const data = [...allCountryList, defaultCountryDetails]
        setAllCountryList([...data])
    }

    const onChangeCountry = (type, countryIndex, name, value) => {
        if (type === 'Edit') {
            allCountryList[countryIndex][name] = value
            setAllCountryList([...allCountryList])
        }
        if (type === 'Remove') {
            const list = [...allCountryList]
            list.splice(countryIndex, 1)
            setAllCountryList(list)
        }
        if (type === 'AddState') {
            allCountryList[countryIndex].state = [...allCountryList[countryIndex].state, defaultStateDetails]
            setAllCountryList([...allCountryList])
        }
    }

    const onChangeState = (type, countryIndex, stateIndex, name, value) => {
        if(type=== 'Edit') {
        allCountryList[countryIndex].state[stateIndex][name] = value
        setAllCountryList([...allCountryList])
        }
        if(type=== 'Remove') {
            const list = [...allCountryList]
            list[countryIndex].state.splice(stateIndex,1)
            setAllCountryList(list)
        }
        if(type=== 'AddCity') {
            allCountryList[countryIndex].state[stateIndex].city = [...allCountryList[countryIndex].state[stateIndex].city, defaultCityDetails]
            setAllCountryList([...allCountryList])
        }
    }

    const onChangeCity = (type, countryIndex, stateIndex, cityIndex, name, value) => {
        if(type=== 'Edit') {
        allCountryList[countryIndex].state[stateIndex].city[cityIndex][name] = value
        setAllCountryList([...allCountryList])
        }
        if(type=== 'Remove') {
            const list = [...allCountryList]
            list[countryIndex].state[stateIndex].city.splice(cityIndex,1)
            setAllCountryList(list)
        }
    }

    return (
        <div className="App">
            <div>
                <button className='buttonClass' onClick={() => {
                    onAddCountry()
                }}>Add Country
                </button>
                {allCountryList.length > 1 &&
                <>
                    <button className='buttonClass'>A -> Z
                    </button>
                    <button className='buttonClass'>Z -> A
                    </button>
                </>
                }
            </div>
            {allCountryList.length !== 0 && allCountryList.map((countryItem, countryIndex) => {
                return (
                    <div className='countryView' key={`this is country ${countryIndex}`}>
                        <input
                            name='countryName'
                            className='countryNameInput'
                            value={countryItem.countryName}
                            onChange={(e) => {
                                onChangeCountry('Edit', countryIndex, 'countryName', e.target.value)
                            }}
                        />
                        <button className='buttonClass' onClick={()=> {onChangeCountry('Remove', countryIndex)}}>Remove</button>
                        <button className='buttonClass' onClick={()=> {onChangeCountry('AddState',countryIndex)}}>Add State</button>
                        {countryItem.state.length !== 0 && countryItem.state.map((stateItem, stateIndex) => {
                            return (
                                <div className='stateView' key={`this is state ${stateIndex}`}>
                                    <input
                                        name='stateName'
                                        className='stateNameInput'
                                        value={stateItem.stateName}
                                        onChange={(e) => {
                                            onChangeState('Edit', countryIndex, stateIndex, 'stateName', e.target.value)
                                        }}
                                    />
                                    <button className='buttonClass' onClick={()=> {onChangeState('Remove',countryIndex, stateIndex)}}>Remove</button>
                                    <button className='buttonClass' onClick={()=> {onChangeState('AddCity', countryIndex, stateIndex)}}>Add City</button>
                                    {stateItem.city.length !== 0 && stateItem.city.map((cityItem, cityIndex) => {
                                        return (
                                            <div className='cityView' key={`this is state ${cityIndex}`}>
                                                <input
                                                    name='cityName'
                                                    className='cityNameInput'
                                                    value={cityItem.cityName}
                                                    onChange={(e) => {
                                                        onChangeCity('Edit', countryIndex, stateIndex, cityIndex, 'cityName', e.target.value)
                                                    }}
                                                />
                                                <button className='buttonClass' onClick={()=> {onChangeCity('Remove', countryIndex, stateIndex, cityIndex)}}>Remove</button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}


export default App;
