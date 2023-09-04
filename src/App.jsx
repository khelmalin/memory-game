import { useState, useEffect } from "react";

import { cardGames } from "./config/constants";
import { shuffle } from "./utils/util";

import Modal from "./components/Modal";

function App() {
  const [momoryGames, setMemoryGames] = useState(shuffle(cardGames));
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [shakeIndexs, setShakeIndexs] = useState([]);

  const isWon = momoryGames.find((memoryGame) => memoryGame.disabled === false)
    ? false
    : true;

  useEffect(() => {
    setVisible(isWon);
  }, [isWon]);

  return (
    <main className="container mx-auto">
      <div className="flex flex-1 flex-col justify-center h-full min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mt-10 mb-10 text-center">
        Memory Game
      </h1>
      <div className="grid grid-cols-8 gap-4">
        {momoryGames.map((cardGame, index) => {
          const { image, visible, key, disabled } = cardGame;

          return (
            <Card
              key={`card-indx-${index}`}
              imageUrl={image}
              visible={visible}
              disabled={disabled}
              incorrect={shakeIndexs.includes(index)}
              onClick={() => {
                if (disabled) {
                  return false;
                }

                const clonedMomoryGames = [...momoryGames];

                if (!selected) {
                  setSelected({ ...cardGame, index });
                  clonedMomoryGames[index] = {
                    ...clonedMomoryGames[index],
                    visible: !visible,
                  };

                  setMemoryGames(clonedMomoryGames);
                  return false;
                }

                if (selected.index === index) {
                  clonedMomoryGames[index] = {
                    ...clonedMomoryGames[index],
                    visible: !visible,
                  };
                  setSelected(null);
                  setMemoryGames(clonedMomoryGames);
                  return false;
                }

                clonedMomoryGames[index] = {
                  ...clonedMomoryGames[index],
                  visible: !visible,
                };

                setMemoryGames(clonedMomoryGames);

                if (selected.key === key) {
                  clonedMomoryGames[index] = {
                    ...clonedMomoryGames[index],
                    visible: true,
                    disabled: true,
                  };
                  clonedMomoryGames[selected.index] = {
                    ...clonedMomoryGames[selected.index],
                    visible: true,
                    disabled: true,
                  };
                  setSelected(null);
                  setMemoryGames(clonedMomoryGames);
                } else {
                  setShakeIndexs([index, selected.index]);

                  setTimeout(() => {
                    clonedMomoryGames[index] = {
                      ...clonedMomoryGames[index],
                      visible: false,
                      disabled: false,
                    };
                    clonedMomoryGames[selected.index] = {
                      ...clonedMomoryGames[selected.index],
                      visible: false,
                      disabled: false,
                    };
                    setSelected(null);
                    setMemoryGames(clonedMomoryGames);
                    setShakeIndexs([]);
                  }, 500);
                }
              }}
            />
          );
        })}
      </div>
      <Modal
        visible={visible}
        isWon={isWon}
        setVisible={setVisible}
        onTryAgain={() => {
          setMemoryGames(shuffle(cardGames));
        }}
      />
      </div>
    </main>
  );
}

const Card = ({ visible = true, disabled = false, imageUrl = null, onClick = () => {}, incorrect = false }) => {
  if (!visible) {
    return (
      <div
        onClick={onClick}
        className="block px-6 py-8 w-full h-40 border-2 not-prose rounded-lg border-gray-200 dark:border-gray-800 bg-slate-200 dark:bg-slate-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group"
      />
    );
  }

  return (
    <div className="w-full h-40">
      <img
        className={`block px-6 py-8 w-full h-full object-contain border-2 not-prose border-gray-200 dark:border-gray-800 group bg-white p-2 rounded-lg ${incorrect ? 'animate-shake animate-once border-red-500 dark:border-red-500' : visible && !disabled ? 'border-blue-500 dark:border-blue-500' : ''}`}
        src={imageUrl}
        onClick={onClick}
        alt=""
      />
    </div>

  );
};

export default App;
