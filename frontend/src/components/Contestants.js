import {gql, useQuery} from "@apollo/client";
import {getMonthPeriodByMonthString} from "../utils";
import {useHistory, useParams} from "react-router-dom";

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

export const GET_CONTESTANTS_QUERY = gql`
query GetContestants($from: timestamptz!, $to: timestamptz!) {
  Contestants {
    name
    lastname
    id
    active
    workOrEducationPlace
    CodeforcesResults(where: {_and: {_and: {date: {_lt: $to}}, date: {_gte: $from}, rank: {_gt: "0"}}}) {
      contestName
      rank
      oldRating
      newRating
      date
      contestantsCount
      contestId
    }
  }
}
`;

function Contestants(props) {
    const {month} = useParams();
    const history = props.history;
    const period = getMonthPeriodByMonthString(month);
    const {data, loading, error} = useQuery(GET_CONTESTANTS_QUERY,
        {variables: {...period},});

    const prevMonth = getMonthPeriodByMonthString(month, true);
    console.log(prevMonth);

    const {data: data_prevMonth, loading: loading_prevMonth, error: error_prevMonth} = useQuery(GET_CONTESTANTS_QUERY,
        {variables: {...prevMonth},});

    const dateFormat = new Intl.DateTimeFormat('ru', {year: 'numeric', month: 'long'});

    if (loading || loading_prevMonth) return <div className="uk-container">
        <div uk-spinner="ratio: 3"></div>
    </div>;

    if (error || error_prevMonth) return <div>Error - {error.toString()}</div>;

    const DatePickerInput = ({ _, onClick }) => (
        <button className="uk-icon-button " uk-icon="calendar" onClick={onClick}></button>
    );

    const contestants = data.Contestants.map(contestant => {
        return {
            lambdaRating: contestant.CodeforcesResults.reduce((a, r) => a + 100*(r.contestantsCount - r.rank) / r.contestantsCount, 0.0),
            lambdaRating_lastMonth: data_prevMonth.Contestants.filter(c => c.id === contestant.id)[0].CodeforcesResults.reduce((a, r) => a + 100*(r.contestantsCount - r.rank) / r.contestantsCount, 0.0),
            ...contestant
        };
    });
    contestants.sort((a, b) => b.lambdaRating - a.lambdaRating);

    return (
        <div>
            <h3>
                <span className="uk-margin-small-right">{dateFormat.format(period.from).slice(0,1).toUpperCase()}{dateFormat.format(period.from).slice(1)}</span>
                <DatePicker
                    className="uk-input"
                    locale="ru"
                    customInput={<DatePickerInput/>}
                    selected={period.from}
                    onChange={date => { history.replace(`/leaderboard/${date.getFullYear()}-${date.getMonth()+1}`); }}
                    maxDate={new Date()}
                    showMonthYearPicker
                    dropdownMode="select"
                />

            </h3>
            <table className="uk-table">
                <thead>
                    <tr>
                        <th>Место</th>
                        <th>Имя</th>
                        <th>Место учебы / работы</th>
                        <th>Рейтинг</th>
                    </tr>
                </thead>
                <tbody>
                {
                    contestants.map((contestant, index) => {
                        return <tr key={contestant.id}>
                            <td>{(contestant.lambdaRating > 0) ? index+1 : null }</td>
                            <td>{contestant.lastname} {contestant.name}</td>
                            <td>{contestant.workOrEducationPlace}</td>
                            <td>{contestant.lambdaRating.toFixed(2)}</td>
                            <td><span className="uk-text-meta">{(contestant.lambdaRating - contestant.lambdaRating_lastMonth).toFixed(2)}</span></td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Contestants;