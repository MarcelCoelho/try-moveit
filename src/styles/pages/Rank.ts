import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  margin-left: 6rem;
  margin-right: 0.5rem;
  align-content: center;
  justify-content: center;

  h2 {
    font-size: 2rem;
    margin-left: 5rem;
  }
`;

export const Rank = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
`;

export const Title = styled.p`
  grid-row: 1;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--gray-line);
`;

export const Grid = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr 1fr;
  margin-top: 1rem;
  max-width: 57rem;
  border-radius: 8px;
  background: var(--gray-line);

  span {
    padding: 8px 4px;
  }

  .header-position {
    color: black;
    align-self: center;
    border-bottom: 1px solid black;
  }

  .header-profile {
    border-bottom: 1px solid black;
    color: black;
    align-self: center;
  }

  .header-challenge {
    border-bottom: 1px solid black;
    color: black;
    align-self: center;
  }

  .header-experience {
    border-bottom: 1px solid black;
    color: black;
    align-self: center;
  }

  .position {
    padding-left: 1rem;
    align-self: center;
    font-weight: 600;
    color: var(--orange);
    font-size: 2rem;
  }

  .profile {
    display: flex;
    align-self: center;

    > img {
      width: 3rem;
      height: 3rem;
      border: 2px solid var(--orange);
      border-radius: 50%;
      align-items: center;
    }

    div {
      margin-left: 0.6rem;

      strong {
        font-size: 0.9rem;
        font-weight: 600;
        color: black;
      }

      img {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
      }

      span {
        font-size: 0.7rem;
        color: var(--title);
      }
    }
  }

  .challenge {
    align-self: center;
    justify-self: center;
    font-weight: 600;
    color: var(--orange);
  }

  .experience {
    align-self: center;
    justify-self: center;
    font-weight: 600;
    color: var(--orange);
  }
`;
/*export const Grid = styled.div`
  display: grid;
  grid-template-rows: 3;

  margin-top: 3rem;
  margin-bottom: 2rem;
  align-items: center;

  span {
    grid-row: 1;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
  }
`;

export const Header = styled.div`
  grid-row: 2;
  margin-bottom: 1rem;

  display: grid;
  grid-template-columns: 4;

  background: red;
  color: white;

  .header-position {
    grid-column: 1;
    width: 10%;
  }

  .header-user {
    grid-column: 2;
    width: 30%;
  }

  .header-challenge {
    grid-column: 3;
    width: 30%;
  }

  .header-experience {
    grid-column: 4;
    width: 30%;
  }
`;

export const Rows = styled.div`
  grid-row: 3;

  grid-template-rows: repeat(1, 250px);

  display: grid;

  max-width: 700px;

  .column-position {
    grid-column: 1;
    width: 2rem;
    width: 10%;
  }

  .column-user {
    grid-column: 2;
    display: flex;
    width: 30%;

    > img {
      width: 3rem;
      height: 3rem;
      border: 2px solid var(--orange);
      border-radius: 50%;
      align-items: center;
    }

    div {
      margin-left: 1rem;

      strong {
        font-size: 0.9rem;
        font-weight: 600;
        color: black;
      }

      p {
        img {
          margin-right: 0.5rem;
        }

        span {
          font-size: 0.8rem;
        }
      }
    }
  }

  .column-challenge {
    grid-column: 3;
    width: 30%;
    display: flex;
    flex-direction: column;

    p {
      font-weight: bold;
      color: var(--orange);
    }

    span {
      margin-left: 3px;
    }
  }
  .column-experience {
    grid-column: 4;
    width: 30%;

    display: flex;
    flex-direction: column;

    p {
      flex: 1;
      font-weight: bold;
      color: var(--orange);
    }

    span {
      margin-left: 3px;
    }
  }
`;

/*.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 992px;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 2.5rem 2rem;   
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: start;
}

.header span {
  font-size: 5rem;
  font: 500 3.5rem "Inter", sans-serif;
  margin-bottom: 0.5rem;  
  color: var(--orange);
}

.card {   
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  background: var(--gray-line);
  border-radius: 5px;
  height: 5rem;
  width: 55rem;
}

.card div:first-child {
  align-items: center;
  margin-left: 1.5rem;
  width: 2rem;
  color: var(--orange);
}

.card div:first-child span {
  font-size: 1.5rem;
  font-weight: bold;  
}

.cardProfile {
  display: flex;
  align-items: center;
  margin-left: 2rem;
  width: 15rem;
}

.cardProfile > img {
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--orange);
  border-radius: 50%;
  align-items: center;
}

.cardProfile div {
  margin-left: 1rem;
}

.cardProfile div strong {
  font-size: 0.9rem;
  font-weight: 600;
  color: black;
}

.cardProfile div img {
  margin-right: 0.5rem;
}

.cardProfile div span {
  font-size: 0.8rem;
}

.cardChallenge {
  display: flex;
  align-items: center;
  margin-left: 15rem;
}

.cardChallenge p {
  font-weight: bold;
  color: var(--orange);
}
.cardChallenge span {
  margin-left: 3px;
}

.cardExperience {
  display: flex;
  align-items: center;
  margin-left: 6rem;
  margin-right: 2rem;
}

.cardExperience p {
  font-weight: bold;
  color: var(--orange);
}
.cardExperience span {
margin-left: 3px;
}*/
