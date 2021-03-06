import styled, { css } from "styled-components";

interface IMenuBarProps {
  activeMenuHome: boolean;
  activeMenuRank: boolean;
}

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 5rem;
  height: 100vh;
  background: #2d2b35;

  display: grid;
  grid-template-columns: 1;

  align-items: center;
  justify-content: center;

  img {
    margin-top: 1rem;

    width: 54px;
    height: 54px;
  }
`;

export const MenuBar = styled.div<IMenuBarProps>`
  display: grid;
  grid-template-rows: 3;
  grid-gap: 1rem;
  height: 100vh;

  svg {
    color: #b35710;
    cursor: pointer;
  }

  svg:hover {
    filter: brightness(0.9);
  }

  .grid-home {
    justify-self: center;
    align-self: flex-end;
  }

  .grid-ranking {
    justify-self: center;
    align-self: flex-start;
  }

  .grid-logout {
    justify-self: center;
    align-self: stretch;

    svg {
      color: black;
    }

    svg:hover {
      filter: brightness(0.9);
      color: white;
    }
  }

  ${(props) =>
    props.activeMenuHome &&
    css`
      .grid-home {
        svg {
          color: white;
        }
      }
      .grid-ranking {
        svg {
          color: #b35710;
        }
      }
    `}

  ${(props) =>
    props.activeMenuRank &&
    css`
      .grid-home {
        svg {
          color: #b35710;
        }
      }
      .grid-ranking {
        svg {
          color: white;
        }
      }
    `}
`;
