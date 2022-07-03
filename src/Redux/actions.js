export const Films = (data) => async dispatch => {
    dispatch({
        type: 'updateData/Films',
        payload: data,
    })
}
export const Cast = (data) => async dispatch => {
    dispatch({
        type: 'updateData/Cast',
        payload: data,
    })
}
export const Cmts = (data) => async dispatch => {
    dispatch({
        type: 'updateData/Cmts',
        payload: data,
    })
}
export const User = (_id, email, name, listCmt, listLike, listHistory, listPlay) =>  async dispatch => {
    dispatch({
        type: 'UpdateData/User',
        email: email,
        _id: _id,
        name: name,
        listCmt: listCmt,
        listLike: listLike,
        listHistory: listHistory,
        listPlay: listPlay
    })
}
export const Update_ListLike = (listLike) =>  async dispatch => {
    dispatch({
        type: 'UpdateListLike/User',
        listLike: listLike,
    })
}
export const Update_ListPlay = (listPlay) =>  async dispatch => {
    dispatch({
        type: 'UpdateListPlay/User',
        listPlay: listPlay,
    })
}
export const Update_ListHistory = (listHistory) =>  async dispatch => {
    dispatch({
        type: 'UpdateListHistory/User',
        listHistory: listHistory,
    })
}