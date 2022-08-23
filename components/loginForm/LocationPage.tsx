import { useState, useEffect } from 'react';

// Assets
import models from '../../scripts/models/models';

// Components
import LoginPageLayout from './LoginPageLayout';
import InputContainer from './input/InputContainer';
import SelectionContainer from './selection/SelectionContainer';

interface LocationPageProps {
  readonly isVisible: boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
  readonly userLocation?: string;
};

export default function LocationPage({
  isVisible, goPrevPage, goNextPage, userLocation,
}: LocationPageProps) {
  const [isValidEntry, setIsValidEntry] = useState<boolean>(userLocation ? true : true);
  const [locations, setLocations] = useState<string[] | []>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>(userLocation || '');
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(userLocation ? 0 : -1);
  const [userInput, setUserInput] = useState<string>('');

  const formatLocations = (items: string[]) => {
    return items.map((item: string) => {
      return models.loginForm.shortenLocationName(item);
    });
  };

  const updateSelectedLocation = (index: number) => {
    if (index === -1) {
      setSelectedLocation('');
      setSelectedLocationIndex(-1);
      models.loginForm.updateLocation('');
    } else {
      setSelectedLocation(locations[index]);
      setSelectedLocationIndex(index);
      models.loginForm.updateLocation(locations[index]);
    }
  }

  const entryHandler = (isValid: boolean, text: string) => {
    setIsValidEntry(isValid);

    if (!isValid && locations.length > 0) {
      setLocations([]);
      updateSelectedLocation(-1);
      setUserInput('');
    } else if (isValid) {
      setUserInput(text);
    }
  };

  useEffect(() => {
    const updateLocations = async (locationName: string) => {
      const locationNames: any = await models.loginForm.getLocations(locationName);
      setLocations(locationNames);
    };

    if (userInput.length) {
      (async function() {
        await updateLocations(userInput);
      })();
    }
  }, [userInput]);

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
        { locations.length === 0 ?
          <>
          </> :
          <SelectionContainer
            items={formatLocations(locations)}
            selectionHandler={updateSelectedLocation}
            defaultSelected={selectedLocationIndex}
          />
        }
      </div>
    </LoginPageLayout>
  );
}
