import TinderCard from "react-tinder-card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import './styles/swiper.scss'
import { useAppDispatch, useAppStore } from "../../../store";
import { WinkAction } from "../../../store/wink/winkSlice";
import { countries, languages } from "countries-list";
import { getSrcByCountryCode } from "../../../static/js/main/countries-languages";

const Direction = {
  LEFT: "left",
  RIGHT: "right",

  isWink: function (direction) {
    return direction === this.RIGHT
  }
}

let middlePoint = undefined;

export const Swiper = () => {
  const { winkStore } = useAppStore();
  const userId = winkStore.userIds[0];
  const userInfo = winkStore.userInfos[userId];
  const userImage = winkStore.userImages[userId];

  const { winkDispatch } = useAppDispatch();

  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const handleSwiped = (direction) => {
    if (!userId) return

    winkDispatch({
      type: WinkAction.WINK,
      payload: {
        id: userId,
        isWink: Direction.isWink(direction)
      }
    })

    containerRef.current.style.backgroundColor = "unset";
  };

  const handleSwiping = () => {
    if (!middlePoint) {
      const container = containerRef.current.getBoundingClientRect()
      middlePoint = (container.right + container.left) / 2
    }

    const img = imgRef.current.getBoundingClientRect()
    const middleOfCard = (img.right + img.left) / 2

    if (middleOfCard > middlePoint + 50)
      containerRef.current.style.backgroundColor = "green";
    else if (middleOfCard < middlePoint - 50)
      containerRef.current.style.backgroundColor = "red";
    else containerRef.current.style.backgroundColor = "unset";
  }

  const handleCancelSwipe = () => {
    const mouseup = document.addEventListener("mouseup", () => {
      containerRef.current.style.backgroundColor = "unset";
      document.removeEventListener("mouseup", mouseup);
    });
  }

  const swipe = (direction) => async () => {
    await cardRef.current.swipe(direction);
  };

  const callbackCard = () => {
    cardRef.current.restoreCard();
  }

  return (
    <div
      className="swiper-container"
      ref={containerRef}
    >
      <div className='cardContainer'>
        {
          userId ?
            <TinderCard
              ref={cardRef}
              className='swipe'
              onSwipe={handleSwiped}
              onSwipeRequirementFulfilled={handleSwiping}
              onSwipeRequirementUnfulfilled={handleSwiping}
              onCardLeftScreen={callbackCard}
              preventSwipe={["up", "down"]}
            >
              <div
                ref={imgRef}
                style={{ backgroundImage: `url(${userImage})` }}
                className='card noselect'
                onMouseDown={handleCancelSwipe}
              >
                <div className="card-info">
                  <h3>{userInfo.fullName}</h3>
                  <span>{userInfo.age}</span>
                  <span>{countries[userInfo.country].name}</span>
                  <img width="20" alt="" src={getSrcByCountryCode(userInfo.country)} />

                  <span>Languages: </span>
                  {
                    userInfo.language.map(l => (
                      <span key={l}>{languages[l].name}</span>
                    ))
                  }

                  <span>{userInfo.interests}</span>
                </div>


              </div>
            </TinderCard>
            : <TinderCard
              ref={cardRef}
              onCardLeftScreen={callbackCard}
              preventSwipe={["up", "down"]}
            >
              <div
                // style={{ backgroundImage: `url(${})` }}
                className='card noselect'
              >
                <div className="card-info">
                  <span>We are looking for new friends for you!</span>
                </div>
              </div>
            </TinderCard>
        }
      </div>

      <div className='buttons noselect'>
        <button
          disabled={!userId}
          onClick={swipe(Direction.LEFT)}
        >
          Not today!
        </button>

        <button
          disabled={!userId}
          onClick={swipe(Direction.RIGHT)}
        >
          Wink-Wink!
        </button>
      </div>
    </div>
  )
};
