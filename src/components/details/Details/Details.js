import React, { useEffect } from 'react';
// import MainDetails from '../MainDetails/MainDetails';
import CrossDetails from '../CrossDetails/CrossDetails';
import classes from './Details.module.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import imageUrl from '../../../images/yard.jpg';
// import icons from '../../../images/icons.svg';
import Indicator from '../../widgets/Indicator/Indicator';

const Details = ({ item, action }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action(id));
  }, [dispatch, action, id]);

  if (!item) return null;

  const currentItem = item;

  return (
    <div className={classes.details}>
      {currentItem && (
        <>
          <div className={classes.details__header}>
            <figure className={classes.details__figure}>
              <img
                className={classes.details__image}
                src={imageUrl}
                alt="Container Yard"
              />
            </figure>
            {currentItem.main && (
              <div className={classes.details__main}>
                <h4 className={classes.details__heading}>
                  <div className={classes.details__indicator}>
                    <Indicator
                      icon={currentItem.main.icon}
                      description="green"
                      action="close"
                    />
                  </div>
                  Description of Goods
                </h4>
                <p className={classes.details__text}>{currentItem.main.text}</p>
              </div>
            )}
          </div>
          <div className={classes.details__body}>
            <CrossDetails crossDetails={currentItem.crossDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
