
const initialState = {
    dataFilms: [],
    dataCast: [],
    dataCmts: [],
    dataUser: {
        _id: '',
        email: '',
        name: '',
        listCmt: [],
        listPlay: [],
        listLike: [],
        listHistory: [],
    }
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'updateData/Films':
            return {
                ...state,
                dataFilms: action.payload,
            }
        case 'updateData/Cast':
            return {
                ...state,
                dataCast: action.payload,
            }
        case 'updateData/Cmts':
            return {
                ...state,
                dataCmts: action.payload,
            }
        case 'UpdateData/User':
            return {
                ...state,
                dataUser: {
                    _id: action._id,
                    email: action.email,
                    name: action.name,
                    listCmt: action.listCmt,
                    listLike: action.listLike,
                    listHistory: action.listHistory,
                    listPlay: action.listPlay,
                }
            }
        case 'UpdateListLike/User':
            return {
                ...state,
                dataUser: {
                    ...state.dataUser,
                    listLike: action.listLike,
                }
            }
        case 'UpdateListPlay/User':
            return {
                ...state,
                dataUser: {
                    ...state.dataUser,
                    listPlay: action.listPlay,
                }
            }
        case 'UpdateListHistory/User':
            return {
                ...state,
                dataUser: {
                    ...state.dataUser,
                    listHistory: action.listHistory,
                }
            }
        default: 
            return state;
    }
}
export default rootReducer;