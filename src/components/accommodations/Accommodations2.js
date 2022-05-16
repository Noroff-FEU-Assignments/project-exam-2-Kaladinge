import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { categoryButtons } from "../../constants/data";
import { FilterContext } from "../../context/AuthContext";
import Heading from "../layout/Heading";
import AccommodationList2 from "./AccommodationList2";

function Accommodations2() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError, setFetchPagesError] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useContext(FilterContext);
  const [categoryButtonStyle, setCategoryButtonStyle] =
    useState(categoryButtons);

  console.log(filter);

  const url =
    "https://kaladinge-pe2.herokuapp.com/api/accommodations/?populate=*";

  useEffect(() => {
    const getAccommodations = async () => {
      try {
        const response = await axios.get(url);
        setDataArray(response.data.data);
        if (filter) {
          console.log(response.data.data[0].attributes.category);
          const filteredArray = response.data.data.filter(
            (item) => item.attributes.category === filter
          );

          setCategoryButtonStyle((prevButtons) => {
            const newButtons = [];
            prevButtons.forEach((item) => {
              if (filter === item.text) {
                const updatedButtons = {
                  ...item,
                  clicked: true,
                };
                newButtons.push(updatedButtons);
              } else {
                newButtons.push(item);
              }
            });
            return newButtons;
          });

          setAccommodations(filteredArray);
        } else {
          setAccommodations(response.data.data);
        }
      } catch (error) {
        setFetchPagesError(error.toString());
      } finally {
        setLoading(false);
        setFilter(null);
      }
    };
    getAccommodations();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchPagesError) {
    return <div>There was a fetch pages error</div>;
  }

  function addCategory(e) {
    const index = parseInt(e.target.dataset.index);

    setCategoryButtonStyle((prevButtons) => {
      const newButtons = [];
      prevButtons.forEach((item) => {
        if (item.id === index) {
          const updatedButtons = {
            ...item,
            clicked: !item.clicked,
          };
          newButtons.push(updatedButtons);
        } else {
          newButtons.push(item);
        }
      });
      return newButtons;
    });

    const filteredArray = dataArray.filter(
      (item) => item.attributes.category === e.target.innerText
    );

    if (accommodations.length === dataArray.length && clicked === false) {
      setAccommodations(filteredArray);
      console.log("first");
      setClicked(true);
    } else {
      const alreadyThere = accommodations.filter(
        (item) => item.attributes.category === e.target.innerText
      );
      setClicked(true);

      if (alreadyThere.length === 0) {
        console.log("new");
        setAccommodations([...accommodations, ...filteredArray]);
      } else {
        console.log("already");
        const newArray = accommodations.filter(
          (item) => item.attributes.category !== e.target.innerText
        );
        setAccommodations(newArray);
      }
    }
  }

  return (
    <>
      <Row>
        <Col className="accommodations border-end">
          <Heading title="All accommodations" />

          {categoryButtonStyle.map((item, index) => (
            <span
              onClick={addCategory}
              key={item.text}
              data-index={index}
              className={`accommodations--category me-4 p-2 ${
                item.clicked ? "accommodations--category--clicked" : ""
              }`}
            >
              {item.text}
            </span>
          ))}

          <AccommodationList2
            accommodations={
              accommodations.length > 0 ? accommodations : dataArray
            }
          />
        </Col>
        <Col xs={2} className="question d-none d-lg-block text-center">
          <div className="question-box position-fixed border ms-4 mt-5 p-3 rounded">
            <p>Have a question?</p>
            <Link className="link" to={`/contact`}>
              Ask us!
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Accommodations2;
