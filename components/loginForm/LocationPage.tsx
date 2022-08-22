import { useState, useEffect, useCallback } from 'react';

// Assets
import models from '../../scripts/models/models';

// Components
import LoginPageLayout from './LoginPageLayout';
import InputContainer from './input/InputContainer';
import SelectionContainer from './selection/SelectionContainer';

interface LocationPageProps {
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
  readonly userLocation?: string;
};

export default function LocationPage({
  isVisible, goPrevPage, goNextPage, userLocation,
}: LocationPageProps) {
  const [isValidEntry, setIsValidEntry] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(userLocation || '');

  const formatLocations = (items: any) => {
    return items.map((item: any) => {
      return models.loginForm.formatLocationName(item);
    });
  };

  const getLocations = useCallback((location: string, isValid: Boolean) => new Promise((resolve, reject) => {
    if (isValid) {
      models.loginForm.getLocations(location)
        .then((response: any) => {
          let formattedLocations = response.map((location: any) => {
            return location['matching_full_name'];
          });

          if (formattedLocations.length) resolve(true);
          else resolve(false);

          setLocations(formattedLocations);
        })
        .catch((err) => {
          setLocations([]);
          reject(err);
        })
    } else {
      setLocations([]);
      resolve(false);
    }
  }), []);

  const entryHandler = useCallback((isValid: Boolean, text: string) => {
    let valid = isValidEntry;

    getLocations(text, isValid)
      .then((response) => {
        valid = Boolean(response);
        setIsValidEntry(valid);
      })
      .catch((response) => {
        console.error('There was an error in retrieving locations: ', response);
      });

  }, [isValidEntry, getLocations]);

  const updateSelectedLocation = useCallback((index: number) => {
    if (index === -1) {
      setSelectedLocation('');
      models.loginForm.updateLocation('');
    } else {
      setSelectedLocation(locations[index]);
      models.loginForm.updateLocation(locations[index]);
    }
  }, [locations]);

  useEffect(() => {
    if (!locations.length) updateSelectedLocation(-1);
  }, [locations, updateSelectedLocation]);

  useEffect(() => {
    if (userLocation && locations) updateSelectedLocation(0);
  }, [userLocation, locations, updateSelectedLocation]);

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Choose location"
      description="This tailors what restaurants we'll show you on Rumble."
      showButton={isValidEntry && selectedLocation.length > 0}
    >
      <div className="flex-1">
        <InputContainer
          labelText="Location"
          errorHandler={models.loginForm.locationErrorHandler}
          inputType="search"
          entryHandler={entryHandler}
          inputText={userLocation}
        />
        <SelectionContainer
          items={formatLocations(locations)}
          selectionHandler={updateSelectedLocation}
        />
      </div>
    </LoginPageLayout>
  );
}
