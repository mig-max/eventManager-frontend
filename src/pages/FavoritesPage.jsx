import React from 'react'
import { useAppContext } from '../context/appContext';
import EventSummary from '../components/EventSummary';
import eventsService from '../services/events.service';

   
const FavoritesPage = () => {

    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

    console.log('favorites are', favorites);

    const favoritesChecker = (id) => {
        const boolean = favorites.some((event) => event._id === id);
        return boolean;
    };

    return (  
           <div className='favorites'>
          
                {favorites.length > 0 ? (
                    favorites.map((event) => (
                    <div key={event._id}>
                        <EventSummary event={event} />
                    <div>
                        { favoritesChecker(event.id) ? (
                        
                        <button onClick={() => removeFromFavorites(event.id)}>
                            Remove from Favorites
                        </button>
                    ) : (
                        <button onClick={() => addToFavorites(event)}>
                              Add to Favorites
                        </button>
                    )}
                         
                    </div>    
                 </div>
                )
            )
        ) : ( 
            <h1>You don't have any favorites</h1>
        )}
    </div>
  
 );
}

export default FavoritesPage
