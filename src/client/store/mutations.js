import * as R from "ramda"

import initialState from "./model"

export const mutationTypes = {
  INITIALIZE_TOURNAMENT_STATE: "INITIALIZE_TOURNAMENT_STATE",
  RESET_TOURNAMENT_STATE: "RESET_TOURNAMENT_STATE",
  SET_ACCESS_NAME: "SET_ACCESS_NAME",
  SET_SOCKET: "SET_SOCKET",
  SET_TOURNAMENT_LOADING: "SET_TOURNAMENT_LOADING",
  SET_TOURNAMENT_NAME: "SET_TOURNAMENT_NAME",
  SET_TOURNAMENT_JOIN_NAME: "SET_TOURNAMENT_JOIN_NAME",
  SET_TOURNAMENT_FOCUSED: "SET_TOURNAMENT_FOCUSED",
  SET_TOURNAMENT_SCORE: "SET_TOURNAMENT_SCORE",
  SOCKET_CLIENTS: "SOCKET_CLIENTS",
  SOCKET_CONNECT: "SOCKET_CONNECT",
  SOCKET_DISCONNECT: "SOCKET_DISCONNECT",
}

export const mutations = {
  [mutationTypes.INITIALIZE_TOURNAMENT_STATE](state, payload) {
    state.tournament = R.mergeDeepRight(initialState.tournament, payload)
    state.tournament.transient.loading = false
  },
  [mutationTypes.RESET_TOURNAMENT_STATE](state) {
    state.tournament = R.clone(initialState.tournament)
  },
  [mutationTypes.SET_ACCESS_NAME](state, payload) {
    const { access, name } = payload
    access.name = name
    state.tournament.meta.lastModified = +new Date()
  },
  [mutationTypes.SET_SOCKET](state, payload) {
    state.$socket = payload
  },
  [mutationTypes.SET_TOURNAMENT_LOADING](state, payload) {
    state.tournament.transient.loading = payload
  },
  [mutationTypes.SET_TOURNAMENT_NAME](state, payload) {
    state.tournament.domain.name = payload
  },
  [mutationTypes.SET_TOURNAMENT_SCORE](state, payload) {
    const { roundIndex, matchIndex, side, score } = payload

    state.tournament.meta.lastModified = +new Date()
    state.tournament.domain.results[roundIndex][matchIndex][side].score =
      parseInt(score) || 0
  },
  [mutationTypes.SET_TOURNAMENT_FOCUSED](state, payload) {
    const { roundIndex, matchIndex, side, focused } = payload

    // state.tournament.meta.lastModified = +new Date()
    state.tournament.domain.results[roundIndex][matchIndex][side].focused = focused
  },
  [mutationTypes.SET_TOURNAMENT_JOIN_NAME](state, payload) {
    const { matchIndex, side, name } = payload

    state.tournament.meta.lastModified = +new Date()
    // state.tournament.domain.results[roundIndex][matchIndex][side].name =
    //     name
    state.tournament.domain.participants[state.tournament.domain.seed[matchIndex][side]] = name
  },
  [mutationTypes.SOCKET_CLIENTS](state, payload) {
    state.tournament.transient.clients = payload
  },
  [mutationTypes.SOCKET_CONNECT](state) {
    state.online = true
  },
  [mutationTypes.SOCKET_DISCONNECT](state) {
    state.online = false
  },
}
