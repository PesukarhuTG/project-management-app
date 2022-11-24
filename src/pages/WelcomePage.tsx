import React from 'react';
import styled, { css } from 'styled-components';
import { BasePage } from '../components';
import heroTeamIco from '../assets/ico/hero-img.svg';
import avatar1 from '../assets/ico/avatar-tatiana.png';
import avatar2 from '../assets/ico/avatar-daria.png';
import avatar3 from '../assets/ico/avatar-sergey.png';
import avatar4 from '../assets/ico/avatar-denis.png';
import { useLocaleMessage } from '../hooks';

const WelcomePage: React.FC = () => {
  const message = useLocaleMessage();

  return (
    <BasePage>
      <HeroSection>
        <div>
          <SectionTitle>{message('mainTitle')}</SectionTitle>
          <HeroDescription>{message('mainDescription')}</HeroDescription>
        </div>
        <HeroImage />
      </HeroSection>
      <TeamSection>
        <SectionTitle>{message('sectionTeam')}</SectionTitle>

        <TeamItem>
          <TeamItemAvatar $name="tatiana" />
          <div>
            <TeamItemTitle>{message('personOneTitle')}</TeamItemTitle>
            <TeamItemDescription>{message('personOneDescription')}</TeamItemDescription>
          </div>
        </TeamItem>

        <TeamItem>
          <div>
            <TeamItemTitle>{message('personSecondTitle')}</TeamItemTitle>
            <TeamItemDescription>{message('personSecondDescription')}</TeamItemDescription>
          </div>
          <TeamItemAvatar $name="daria" />
        </TeamItem>

        <TeamItem>
          <TeamItemAvatar $name="sergey" />
          <div>
            <TeamItemTitle>{message('personThirdTitle')}</TeamItemTitle>
            <TeamItemDescription>{message('personThirdDescription')}</TeamItemDescription>
          </div>
        </TeamItem>

        <TeamItem>
          <div>
            <TeamItemTitle>{message('personFourthTitle')}</TeamItemTitle>
            <TeamItemDescription>{message('personFourthDescription')}</TeamItemDescription>
          </div>
          <TeamItemAvatar $name="denis" />
        </TeamItem>
      </TeamSection>
    </BasePage>
  );
};

const HeroSection = styled.section`
  max-width: 1440px;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 50px;
  padding: 0 110px;

  @media (max-width: 1120px) {
    flex-direction: column;
    justify-items: center;
    gap: 20px;
    padding: 0;
    margin: 0 auto 30px;
  }
`;

const SectionTitle = styled.h2`
  align-self: flex-start;
  font-weight: 700;
  font-size: 40px;
  line-height: 54px;
  color: var(--primary-dark);
  margin: 0 0 20px;

  @media (max-width: 1120px) {
    font-size: 32px;
    text-align: center;
    margin: 0 auto;
  }
`;

const HeroDescription = styled.p`
  max-width: 600px;
  font-size: 24px;
  line-height: 33px;
  margin: 0;

  @media (max-width: 1120px) {
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
    font-size: 20px;
    line-height: 29px;
  }
`;

const HeroImage = styled.div`
  width: 470px;
  height: 470px;
  flex-shrink: 0;
  background: url(${heroTeamIco});
  background-size: contain;

  @media (max-width: 1120px) {
    width: 350px;
    height: 350px;
    margin: 0 auto;
    background-size: contain;
  }

  @media (max-width: 430px) {
    width: 240px;
    height: 240px;
  }
`;

const TeamSection = styled.section`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 50px;
  padding: 0 110px;

  @media (max-width: 1000px) {
    padding: 0;
    gap: 40px;
  }
`;

const TeamItem = styled.div`
  max-width: 1020px;
  width: 100%;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 620px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 20px;
  }
`;

const TeamItemTitle = styled.p`
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: var(--primary-dark);
`;

const TeamItemDescription = styled.p`
  max-width: 900px;
  width: 100%;
  line-height: 29px;
`;

const TeamItemAvatar = styled.div<{
  $name: string;
}>`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  ${({ $name }) => {
    if ($name === 'tatiana')
      return css`
        background: url(${avatar1});
      `;
    if ($name === 'daria')
      return css`
        background: url(${avatar2});

        @media (max-width: 620px) {
          order: -1;
        }
      `;
    if ($name === 'sergey')
      return css`
        background: url(${avatar3});
      `;
    if ($name === 'denis')
      return css`
        background: url(${avatar4});

        @media (max-width: 620px) {
          order: -1;
        }
      `;
  }}
  background-size: contain;
`;

export default WelcomePage;
