import React, { useRef } from "react";
import GameSection from "../components/UI/GameSection";
import GameHeading from "../components/GameHeading/GameHeading";
import Wrapper from "../components/UI/Wrapper";

import { useCookies } from "react-cookie";
import HostJoinGame from "../components/paperGame/HostJoinGame";

const PaperGame = () => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "uuid",
    "name",
    "roomId",
  ]);
  document.title = "Paper Game | Michael Rendall";

  const hostJoinRequestHandler = async (functionName: string) => {
    const response = await fetch(`http://localhost:8080/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        room: roomNameRef.current!.value,
        name: userNameRef.current!.value,
      }),
    });
    const responseData = await response.json();

    if (response.status === 500) {
      alert(responseData.message);
      return;
    }

    setCookie("uuid", responseData.uuid);
    setCookie("name", responseData.name);
    setCookie("roomId", responseData.roomId);
  };

  const hostGameHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    hostJoinRequestHandler("create-game");
  };

  const joinGameHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    hostJoinRequestHandler("join-game");
  };

  const leaveGameHandler = () => {
    removeCookie("uuid");
    removeCookie("name");
    removeCookie("roomId");
  };

  return (
    <GameSection theme="yellow">
      <GameHeading heading="PAPER GAME" />
      <Wrapper size="auto">
        {!cookies.roomId && (
          <HostJoinGame
            hostGameHandler={hostGameHandler}
            joinGameHandler={joinGameHandler}
            userNameRef={userNameRef}
            roomNameRef={roomNameRef}
          />
        )}
        {cookies.roomId && (
          <>
            <p>game is set. {cookies.name} ready to play</p>
            <button onClick={leaveGameHandler}>clear</button>
          </>
        )}
      </Wrapper>
    </GameSection>
  );
};

export default PaperGame;
