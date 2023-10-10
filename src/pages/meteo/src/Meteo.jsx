import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { maxBy, minBy } from 'lodash';
import { ResponsiveLine } from '@nivo/line';
import GlobalStyles from '../../../theme/globalStyles';
import PageTitle from '../../../components/ui/PageTitle';
import Loader from '../../../components/ui/Loader';
import Icon from '../../../components/ui/Icon';
import Hi from '../../../public/icons/Hi.svg';
import Low from '../../../public/icons/Low.svg';
import ArrowUpRight from '../../../public/icons/ArrowUpRight.svg';
import Text from '../../../public/icons/Text.svg';
import Clock from '../../../public/icons/Clock.svg';
import { linksStyles, boldStyles } from '../../../theme';
import Flex from './Flex';

const HI_COLOR = '#f85757';
const LOW_COLOR = '#51a2ed';
const ARCHIVE_COLOR = 'var(--color-primary)';
const CHART_COLOR = 'var(--color-primary)';
const ACCENT_COLOR = '#cb77fb';
const TEMPERATURE_UNIT = '°C';
const HUMIDITY_UNIT = '%';
const WIND_UNIT = 'Km/h';
const PRESSURE_UNIT = 'hPa';
const RAIN_UNIT = 'mm';
const RAIN_RATE_UNIT = 'mm/h';
const monoStyles = css`
    font-family: var(--font-family-mono);
    font-weight: 800;
`;

function Meteo() {
    const { isLoading, isSuccess, isError, data } = useQuery(
        // default cache is 5 mins, same as our interval data
        'meteo',
        getMeteoData,
    );

    return (
        <>
            <GlobalStyles />
            <Wrapper center={isLoading || isError}>
                {isLoading && (
                    <LoadingInfo>
                        <Loader size="2rem" />
                        Carico i dati..
                    </LoadingInfo>
                )}
                {isError && <ErrorMessage />}
                {isSuccess && <DataPage data={data} />}
            </Wrapper>
        </>
    );
}

async function getMeteoData() {
    const response = await fetch(
        `${
            import.meta.env.VITE_SIGNALKUPPE_WEBSITE_FUNCTIONS_BASE_URL
        }.netlify/functions/weatherlink`,
    );

    const json = await response.json();

    if (!json.ok) {
        throw { status: response.status, message: json.error };
    } else {
        return json;
    }
}

function ErrorMessage() {
    return (
        <Error>
            <ErrorEmoji>😓</ErrorEmoji>
            Ops, qualcosa è andato storto.
            <br />
            <ErrorLink href="/contatti/index.html">
                Inviami un messaggio
            </ErrorLink>{' '}
            se l’errore persiste
        </Error>
    );
}

function DataPage({ data }) {
    const { current, day } = data;
    return (
        <DataWrapper>
            <PageTitle xsmall>Meteo Concenedo</PageTitle>
            <LatestUpdate>
                Ultimo aggiornamento il <strong>{current.last_data_day}</strong>{' '}
                alle <strong>{current.last_data_hour}</strong>
            </LatestUpdate>
            <DataGrid>
                <DataBox
                    title="Temperatura"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.temperature_max}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.temperature_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.temperature_min}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>{day.temperature_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.temperature}
                        {TEMPERATURE_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Umidità"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.humidity_max}
                                            {HUMIDITY_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.humidity_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.humidity_min}
                                            {HUMIDITY_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>{day.humidity_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.humidity}
                        {HUMIDITY_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Pressione"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.pressure_max}
                                            {PRESSURE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.pressure_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.pressure_min}
                                            {PRESSURE_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>{day.pressure_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <Flex
                        gap="0.2em"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <FatValue>
                            {current.pressure} {PRESSURE_UNIT}
                        </FatValue>
                        <SmallValue>{current.pressure_trend}</SmallValue>
                    </Flex>
                </DataBox>
                <DataBox
                    title="Vento"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.wind_max}
                                            {WIND_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.wind_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <AccentLabel icon={<ArrowUpAccentIcon />}>
                                    Direzione media
                                </AccentLabel>
                                <Flex gap="1rem">
                                    <AccentText>
                                        <BoldText>
                                            {day.wind_prevailing_dir}
                                            {TEMPERATURE_UNIT}
                                        </BoldText>
                                    </AccentText>

                                    <AtValue>{day.wind_chill_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.wind} {WIND_UNIT} {current.wind_direction}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Pioggia odierna"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <ArchiveLabel>Mese</ArchiveLabel>
                                <Flex gap="1rem">
                                    <ArhiveText>
                                        <MonoText>
                                            {current.rain_month}
                                            {RAIN_UNIT}
                                        </MonoText>
                                    </ArhiveText>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <ArchiveLabel>Anno</ArchiveLabel>
                                <Flex gap="1rem">
                                    <ArhiveText>
                                        <MonoText>
                                            {current.rain_year}
                                            {RAIN_UNIT}
                                        </MonoText>
                                    </ArhiveText>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.rain} {RAIN_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Intensità pioggia"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.rain_rate_max}
                                            {RAIN_RATE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.rain_rate_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <AccentLabel icon={<UpAccentIcon />}>
                                    Ultimi 15 minuti
                                </AccentLabel>
                                <Flex gap="1rem">
                                    <AccentText>
                                        <MonoText>
                                            {day.rain_rate_max}
                                            {RAIN_RATE_UNIT}
                                        </MonoText>
                                    </AccentText>
                                    <AtValue>{day.rain_rate_max_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.rain_rate} {RAIN_RATE_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Punto di rugiada"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.dew_point_max}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.dew_point_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.dew_point_min}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>{day.dew_point_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.dew_point}
                        {TEMPERATURE_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Bulbo umido"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.wet_bulb_max}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.wet_bulb_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.wet_bulb_min}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>{day.wet_bulb_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.wet_bulb}
                        {TEMPERATURE_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Indice di calore"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.heat_index_max}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>{day.heat_index_max_at}</AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel>
                                    <LowText>Wind chill min</LowText>
                                </MinLabel>
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.wind_chill_min}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>{day.wind_chill_min_at}</AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.heat_index}
                        {TEMPERATURE_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Radiazione solare"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <ArchiveLabel>Evapotraspirazione</ArchiveLabel>
                                <Flex gap="1rem">
                                    <ArhiveText>
                                        <MonoText>
                                            {current.et_day}
                                            {RAIN_UNIT}
                                        </MonoText>
                                    </ArhiveText>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <ArchiveLabel>Ev annuale</ArchiveLabel>
                                <Flex gap="1rem">
                                    <ArhiveText>
                                        <MonoText>
                                            {current.et_year}
                                            {RAIN_UNIT}
                                        </MonoText>
                                    </ArhiveText>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.solar_radiation} W/m<sup>2</sup>
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Temperatura a 12m"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.temperature_tetto_max}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>
                                        {day.temperature_tetto_max_at}
                                    </AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.temperature_tetto_min}
                                            {TEMPERATURE_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>
                                        {day.temperature_tetto_min_at}
                                    </AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.temperature_tetto}
                        {TEMPERATURE_UNIT}
                    </FatValue>
                </DataBox>
                <DataBox
                    title="Umidità a 12m"
                    footer={
                        <Flex flexDirection="column" gap="0.5rem">
                            <Flex justifyContent="space-between">
                                <MaxLabel />
                                <Flex gap="1rem">
                                    <HiText>
                                        <MonoText>
                                            {day.humidity_tetto_max}
                                            {HUMIDITY_UNIT}
                                        </MonoText>
                                    </HiText>
                                    <AtValue>
                                        {day.humidity_tetto_max_at}
                                    </AtValue>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-between">
                                <MinLabel />
                                <Flex gap="1rem">
                                    <LowText>
                                        <MonoText>
                                            {day.humidity_tetto_min}
                                            {HUMIDITY_UNIT}
                                        </MonoText>
                                    </LowText>
                                    <AtValue>
                                        {day.humidity_tetto_min_at}
                                    </AtValue>
                                </Flex>
                            </Flex>
                        </Flex>
                    }
                >
                    <FatValue>
                        {current.humidity_tetto}
                        {HUMIDITY_UNIT}
                    </FatValue>
                </DataBox>
            </DataGrid>
            <GraphGrid>
                <Graph title="Temperatura">
                    <LineChart data={day.graph_temperature} />
                </Graph>
                <Graph title="Umidità">
                    <LineChart data={day.graph_humidity} />
                </Graph>
                <Graph title="Pressione">
                    <LineChart data={day.graph_pressure} />
                </Graph>
            </GraphGrid>
        </DataWrapper>
    );
}

function DataBox({ title, children, footer }) {
    return (
        <DataBoxWrapper>
            <DataBoxHeader>{title}</DataBoxHeader>
            <DataBoxBody>{children}</DataBoxBody>
            <DataBoxFooter>{footer}</DataBoxFooter>
        </DataBoxWrapper>
    );
}

function MaxLabel({ children }) {
    return (
        <MaxMinWrapper>
            <HiIcon /> <strong>{children || 'Max:'}</strong>
        </MaxMinWrapper>
    );
}

function MinLabel({ children }) {
    return (
        <MaxMinWrapper>
            <LowIcon /> <strong>{children || 'Min:'}</strong>
        </MaxMinWrapper>
    );
}

function ArchiveLabel({ children }) {
    return (
        <MaxMinWrapper>
            <ArchiveIcon /> <strong>{children}</strong>
        </MaxMinWrapper>
    );
}

function AccentLabel({ children, icon }) {
    return (
        <MaxMinWrapper>
            {icon} <strong>{children}</strong>
        </MaxMinWrapper>
    );
}

function AtValue({ children }) {
    return (
        <AtWrapper>
            <Icon icon={Clock} xs />
            {children}
        </AtWrapper>
    );
}

function HiIcon() {
    return (
        <HiText>
            <Icon icon={Hi} />
        </HiText>
    );
}

function LowIcon() {
    return (
        <LowText>
            <Icon icon={Low} />
        </LowText>
    );
}

function ArchiveIcon() {
    return (
        <ArhiveText>
            <Icon icon={Text} />
        </ArhiveText>
    );
}

function UpAccentIcon() {
    return (
        <AccentText>
            <Icon icon={Hi} />
        </AccentText>
    );
}

function ArrowUpAccentIcon() {
    return (
        <AccentText>
            <Icon icon={ArrowUpRight} />
        </AccentText>
    );
}

function LineChart({ data }) {
    // https://nivo.rocks/line/

    const fullData = [{ id: Math.random(), data }];

    return (
        <ResponsiveLine
            curve="basis"
            margin={{ top: 0, right: 30, bottom: 30, left: 50 }}
            colors={['var(--color-primary)']}
            data={fullData}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d %H:%M',
                useUTC: false,
                precision: 'minute',
            }}
            yScale={{
                type: 'linear',
                min: minBy(data, (d) => d.y).y,
                max: maxBy(data, (d) => d.y).y,
            }}
            axisBottom={{
                format: '%H',
                tickValues: 'every 1 hour',
            }}
            colorBy={() => CHART_COLOR}
            layers={['grid', 'axes', 'lines']}
            tickCount={10}
            theme={{
                grid: {
                    line: {
                        stroke: 'var(--color-background-xx-light)',
                        strokeWidth: 2,
                        strokeDasharray: '4 4',
                    },
                },
                axis: {
                    ticks: {
                        text: {
                            fill: 'var(--color-text)',
                            fontSize: 14,
                        },
                    },
                    domain: {
                        line: {
                            stroke: 'var(--color-text)',
                            strokeWidth: 1,
                        },
                    },
                },
            }}
        />
    );
}

function Graph({ title, children }) {
    return (
        <GraphWrapper>
            <GraphTitle>{title}</GraphTitle>
            {children}
        </GraphWrapper>
    );
}

const Wrapper = styled.div`
    padding: calc(var(--space-unit) * 1.5);
    ${(props) =>
        props.center &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        `}
`;

const LoadingInfo = styled.div`
    display: flex;
    align-items: center;
    gap: calc(var(--space-unit) / 2);
`;
const Error = styled.div`
    background-color: var(--color-background-light);
    color: white;
    padding: var(--space-unit);
    max-width: 500px;
    text-align: center;
`;

const ErrorEmoji = styled.div`
    font-size: var(--font-size-x-large);
`;

const ErrorLink = styled.a`
    ${linksStyles}
`;

const DataWrapper = styled.div``;

const LatestUpdate = styled.p`
    margin-top: calc(var(--space-unit) / 1.5);
    font-size: var(--font-size-small);
    strong {
        ${boldStyles}
    }
`;

const DataGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    margin-top: calc(var(--space-unit) * 1.5);
    max-width: 1180px;
`;

const DataBoxWrapper = styled.div`
    background-color: var(--color-background-light);
    border-radius: 10px;
    line-height: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const DataBoxHeader = styled.div`
    padding: calc(var(--space-unit) / 2);
    background: var(--color-background-x-light);
    color: var(--color-text-light-accent);
    ${boldStyles}
`;
const DataBoxBody = styled.div`
    padding: calc(var(--space-unit) / 1);
    display: flex;
    justify-content: center;
`;
const DataBoxFooter = styled.div`
    font-size: var(--font-size-small);
    padding: calc(var(--space-unit) / 2);
    background: var(--color-background-x-light);
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const MaxMinWrapper = styled.span`
    ${boldStyles}
    display: flex;
    align-items: center;
    gap: 0.15em;
`;

const AtWrapper = styled.span`
    display: flex;
    align-items: center;
    gap: 0.2em;
    ${monoStyles}
`;

const LowText = styled.span`
    color: ${LOW_COLOR};
`;

const HiText = styled.span`
    color: ${HI_COLOR};
`;

const ArhiveText = styled.span`
    color: ${ARCHIVE_COLOR};
`;

const AccentText = styled.span`
    color: ${ACCENT_COLOR};
`;

const MonoText = styled.span`
    ${monoStyles}
`;

const FatValue = styled.span`
    font-size: var(--font-size-large);
    font-weight: 700;
    color: var(--color-text-light-accent);
`;

const SmallValue = styled.span`
    font-size: var(--font-size-x-small);
`;

const BoldText = styled.span`
    font-weight: 700;
`;

const GraphGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 1rem;
    margin-top: calc(var(--space-unit) * 1.5);
    max-width: 1200px;
`;

const GraphWrapper = styled.div`
    width: 100%;
    aspect-ratio: 3/2;
`;

const GraphTitle = styled.div`
    font-size: var(--font-size-large);
    font-weight: 700;
    color: var(--color-text-light-accent);
`;

export default Meteo;
