import React, { useEffect, useState } from 'react';
import styles from './styles/NewsListUser.module.css';
import Event from './components/Event/Event';
import News from './components/News/News';

import axios from 'axios';


function NewsListUser() {
  const [data, setData] = useState(null)
  const [todayItems, setTodayItems] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const fetchAll = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/news/get`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setData(response?.data)
      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  useEffect(() => {
    if(data) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const filteredItems = data.filter(item => {
      const itemDate = item.type === 'Новость' ? new Date(item.date) : new Date(item.start);
      return itemDate >= startOfDay && itemDate < endOfDay;
    });

    const sortedItems = filteredItems.sort((a, b) => {
      const dateA = a.type === 'Новость' ? new Date(a.date) : new Date(a.start);
      const dateB = b.type === 'Новость' ? new Date(b.date) : new Date(b.start);
      return dateA - dateB;
    });

    setTodayItems(sortedItems);

    const remainingItems = data.filter(item => !sortedItems.includes(item));
    setFilteredData(remainingItems);
  }
  }, [data]);


    

  return (
    <div className={styles.news__list__user}>
      <div className={`${styles.news__list__user__container} _container`}>
      <div className={styles.on__today__block__text}>На Сегодня</div>
      {todayItems?.map((item, index) => (
         item.type === "Новость" ? (<News key={index} img={item.images} date={item.date} description={item.description} heading={item.heading} />) : (<Event key={index} img={item.images} date={item.date} description={item.description} heading={item.heading} start={item.start} place={item.place}/>)
       ))}
        <div className={`${styles.news__list__user__new__block} ${styles.new__block}`}>
          <div className={styles.new__block__text}>Лента</div>
          {filteredData?.map((item, index) => (
         item.type === "Новость" ? (<News key={index} img={item.images} date={item.date} description={item.description} heading={item.heading} />) : (<Event key={index} img={item.images} date={item.date} description={item.description} heading={item.heading} start={item.start} place={item.place}/>)
       ))}
          
        </div>

        
      </div>
    </div>
  );
}

export default NewsListUser;
