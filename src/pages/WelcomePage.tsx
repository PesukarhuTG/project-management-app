import React from 'react';
import styled, { css } from 'styled-components';
import { BasePage } from '../components';
import heroTeamIco from '../assets/ico/hero-img.svg';
import avatar1 from '../assets/ico/avatar-tatiana.png';
import avatar2 from '../assets/ico/avatar-daria.png';
import avatar3 from '../assets/ico/avatar-sergey.png';

const WelcomePage: React.FC = () => {
  return (
    <BasePage>
      <HeroSection>
        <div>
          <SectionTitle>Task Manager</SectionTitle>
          <HeroDescription>
            It is a project management software that allows you to centrally manage tasks and their timely completion.
            Trackers are widely used in project management, because they allow you to easily monitor all work processes
            and control the work of the team.
          </HeroDescription>
        </div>
        <HeroImage />
      </HeroSection>
      <TeamSection>
        <SectionTitle>Project team</SectionTitle>

        <TeamItem>
          <TeamItemAvatar $name="tatiana" />
          <div>
            <TeamItemTitle>Tatiana | frontend-developer</TeamItemTitle>
            <TeamItemDescription>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </TeamItemDescription>
          </div>
        </TeamItem>

        <TeamItem>
          <div>
            <TeamItemTitle>Daria | frontend-developer</TeamItemTitle>
            <TeamItemDescription>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </TeamItemDescription>
          </div>
          <TeamItemAvatar $name="daria" />
        </TeamItem>

        <TeamItem>
          <TeamItemAvatar $name="sergey" />
          <div>
            <TeamItemTitle>Sergey | frontend-developer</TeamItemTitle>
            <TeamItemDescription>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </TeamItemDescription>
          </div>
        </TeamItem>
      </TeamSection>
    </BasePage>
  );
};

const HeroSection = styled.section`
  max-width: 1440px;
  display: flex;
  gap: 50px;
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
  margin: 0 auto 50px;
  padding: 0 110px;

  @media (max-width: 1000px) {
    padding: 0;
    gap: 40px;
  }
`;

const TeamItem = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

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
  }}
  background-size: contain;
`;

export default WelcomePage;
