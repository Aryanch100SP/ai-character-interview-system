import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  characterForm: {
    name: '',
    short_description: '',
    backstory: '',
    personality_traits: ''
  },
  activeCharacter: null, 
};

function characterReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FORM_FIELD':
      return {
        ...state,
        characterForm: {
          ...state.characterForm,
          [action.field]: action.value
        }
      };
    case 'RESET_FORM':
      return { ...state, characterForm: initialState.characterForm };
    case 'SET_ACTIVE_CHARACTER':
      return { ...state, activeCharacter: action.payload };
    default:
      return state;
  }
}

const CharacterContext = createContext();

export function CharacterProvider({ children }) {
  const [state, dispatch] = useReducer(characterReducer, initialState);
  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
}

export const useCharacterContext = () => useContext(CharacterContext);