import { createSlice } from "@reduxjs/toolkit";

export const revistaSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
  },

  reducers: {
    onSetActiveEvent: (state, {payload}) => {
        state.activeEvent = payload;
    },
    onAddNewEvent: (state, {payload}) => {
        state.events.push(payload);
        state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event =>
        event._id === payload._id ? payload : event
      );
    },

    onDeleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach(event => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
  },
});

// ✅ Exportar correctamente las acciones
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents 

} = revistaSlice.actions;