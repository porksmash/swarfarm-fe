import React from 'react';
import { Segment, Statistic, Grid, Icon, Header, Dropdown } from 'semantic-ui-react';

import { calcActualStat } from 'services/monsters';

const StarSelector = ({ min_stars, onChange }) => {
  const options = [];

  for (let stars = 6; stars >= min_stars; stars--) {
    options.push({
      key: stars,
      value: stars,
      text: (
        <span>
          {stars}
          <Icon name="star" />
        </span>
      )
    });
  }

  return (
    <Header size="small">
      <Header.Content>
        Stats at{' '}
        <Dropdown inline defaultValue={options[0].value} options={options} onChange={onChange} />
      </Header.Content>
    </Header>
  );
};

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stars: 6 };
  }

  onChangeStars = (event, data) => {
    this.setState({ stars: data.value });
  };

  render() {
    const { monster } = this.props;

    return (
      <Segment>
        <StarSelector min_stars={monster.base_stars} onChange={this.onChangeStars} />
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>
                {calcActualStat(monster.raw_hp, this.state.stars, 40) * 15}
              </Statistic.Value>
              <Statistic.Label>HP</Statistic.Label>
            </Grid.Column>

            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>
                {calcActualStat(monster.raw_attack, this.state.stars, 40) * 15}
              </Statistic.Value>
              <Statistic.Label>ATK</Statistic.Label>
            </Grid.Column>

            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>
                {calcActualStat(monster.raw_defense, this.state.stars, 40) * 15}
              </Statistic.Value>
              <Statistic.Label>DEF</Statistic.Label>
            </Grid.Column>

            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>{monster.speed}</Statistic.Value>
              <Statistic.Label>SPD</Statistic.Label>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>{monster.crit_rate}%</Statistic.Value>
              <Statistic.Label>CRI Rate</Statistic.Label>
            </Grid.Column>

            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>{monster.crit_damage}%</Statistic.Value>
              <Statistic.Label>CRI Dmg</Statistic.Label>
            </Grid.Column>

            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>{monster.resistance}%</Statistic.Value>
              <Statistic.Label>Resistance</Statistic.Label>
            </Grid.Column>

            <Grid.Column as={Statistic} size="tiny">
              <Statistic.Value>{monster.accuracy}%</Statistic.Value>
              <Statistic.Label>Accuracy</Statistic.Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Stats;