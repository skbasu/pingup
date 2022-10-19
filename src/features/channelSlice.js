import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channelId: null,
        channelName: null,
        channelPhoto: null,
    },
    reducers: {
        setChannel: (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
            state.channelPhoto = action.payload.channelPhoto;
        },
    },
});

export const { setChannel } = channelSlice.actions;

export const selectChannelId = (state) => state.channel.channelId;
export const selectChannelName = (state) => state.channel.channelName;
export const selectChannelPhoto = (state) => state.channel.channelPhoto;

export default channelSlice.reducer;