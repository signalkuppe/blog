import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import { maxBy, minBy, union } from 'lodash';
import { ResponsiveLine } from '@nivo/line'; // https://nivo.rocks/line/
import { ResponsivePie } from '@nivo/pie';
import GlobalStyles from '../../../theme/globalStyles';
import ContentContainer from '../../../components/layout/Container';
import PageTitle from '../../../components/ui/PageTitle';
import Loader from '../../../components/ui/Loader';
import Icon from '../../../components/ui/Icon';
import Hi from '../../../public/icons/Hi.svg';
// import CloseIcon from '../../../public/icons/Cross.svg';
import Low from '../../../public/icons/Low.svg';
import ArrowUpRight from '../../../public/icons/ArrowUpRight.svg';
import Text from '../../../public/icons/Text.svg';
import Video from '../../../public/icons/Video.svg';
import Clock from '../../../public/icons/Clock.svg';
import { linksStyles, boldStyles } from '../../../theme';
import Flex from './Flex';

const HI_COLOR = '#f85757';
const LOW_COLOR = '#51a2ed';
const ARCHIVE_COLOR = 'var(--color-primary)';
const CHART_COLOR = 'var(--color-primary)';
const CHART_SECONDARY_COLOR = '#006ac3';
const CHART_FONT_SIZE = 11;
const CHART_GRID_SIZE = 1;
const CHART_GRID_COLOR = 'var(--color-background-xx-light)';
const CHART_GRID_DASH = '4 4';
const CHART_AXIS_COLOR = 'var(--color-text)';
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
const LINE_WIDTH = 1;

const GraphTemperatureTitle = `Temperatura (${TEMPERATURE_UNIT})`;
const GraphHumidityTitle = `Umidità (${HUMIDITY_UNIT})`;
const GraphPressureTitle = `Pressione (${PRESSURE_UNIT})`;
const GraphMaxWindTitle = `Raffica massima (${WIND_UNIT})`;
const GraphAvarageWindDirection = `Direzione del vento`;
const GraphAvarageWindDistribution = `Distribuzione vento`;
const GraphrainRateTitle = `Intensità pioggia (${RAIN_RATE_UNIT})`;
const GraphTemperatureDownUp = `Temperatura 2m/12m (${TEMPERATURE_UNIT})`;

function Meteo() {
    const { isLoading, isSuccess, isError, data, isRefetching } = useQuery(
        // default cache is 5 mins, same as our interval data
        'meteo',
        getMeteoData,
        {
            refetchOnWindowFocus: true,
            refetchInterval: 300000, // 5 mins
        },
    );

    return (
        <>
            <GlobalStyles />
            {/*
            <CloseButton
                href={'/'}
                title="Torna al blog"
                aria-label="Torna al blog"
            >
                <Icon icon={CloseIcon} l />
            </CloseButton>
    */}
            {isLoading && (
                <Center>
                    <LoadingInfo>
                        <Loader size="2rem" />
                        Carico i dati..
                    </LoadingInfo>
                </Center>
            )}
            {isError && (
                <Center>
                    <ErrorMessage />
                </Center>
            )}

            {isSuccess && (
                <ContentContainer>
                    <DataPage data={data} isRefetching={isRefetching} />
                </ContentContainer>
            )}
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

function DataPage({ data, isRefetching }) {
    const { current, day } = data;

    return (
        <DataWrapper>
            <Header>
                <HeaderLeft>
                    <StyledPageTitle xsmall>
                        Meteo Concenedo <Beta>beta</Beta>
                    </StyledPageTitle>
                    <LatestUpdate>
                        Ultimo aggiornamento il{' '}
                        <strong>
                            <MonoText>{current.last_data_day}</MonoText>
                        </strong>{' '}
                        alle{' '}
                        <strong>
                            <MonoText>{current.last_data_hour}</MonoText>
                        </strong>
                    </LatestUpdate>
                </HeaderLeft>
            </Header>
            <main>
                <DataGrid>
                    <DataBox
                        title="Temperatura"
                        isRefetching={isRefetching}
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
                                        <AtValue>
                                            {day.temperature_max_at}
                                        </AtValue>
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
                                        <AtValue>
                                            {day.temperature_min_at}
                                        </AtValue>
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
                        isRefetching={isRefetching}
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
                        isRefetching={isRefetching}
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
                            style={{
                                position: 'relative',
                                top: '0.5em',
                            }}
                        >
                            <FatValue>
                                {current.pressure} {PRESSURE_UNIT}
                            </FatValue>
                            <SmallValue>{current.pressure_trend}</SmallValue>
                        </Flex>
                    </DataBox>
                    <DataBox
                        title="Vento"
                        isRefetching={isRefetching}
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
                                        Dir. prevalente
                                    </AccentLabel>
                                    <Flex gap="1rem">
                                        <AccentText>
                                            <BoldText>
                                                {day.wind_prevailing_dir}
                                                {TEMPERATURE_UNIT}
                                            </BoldText>
                                        </AccentText>

                                        <AtValue>
                                            {day.wind_chill_min_at}
                                        </AtValue>
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
                        isRefetching={isRefetching}
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
                        isRefetching={isRefetching}
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
                                        <AtValue>
                                            {day.rain_rate_max_at}
                                        </AtValue>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-between">
                                    <AccentLabel icon={<UpAccentIcon />}>
                                        Ultimi 15 minuti
                                    </AccentLabel>
                                    <Flex gap="1rem">
                                        <AccentText>
                                            <MonoText>
                                                {day.rain_rate_last_15_min > 0
                                                    ? `${day.rain_rate_last_15_min} ${RAIN_RATE_UNIT}`
                                                    : '-'}
                                            </MonoText>
                                        </AccentText>
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
                        isRefetching={isRefetching}
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
                                        <AtValue>
                                            {day.dew_point_max_at}
                                        </AtValue>
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
                                        <AtValue>
                                            {day.dew_point_min_at}
                                        </AtValue>
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
                        isRefetching={isRefetching}
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
                        isRefetching={isRefetching}
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
                                        <AtValue>
                                            {day.heat_index_max_at}
                                        </AtValue>
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
                                        <AtValue>
                                            {day.wind_chill_min_at}
                                        </AtValue>
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
                        isRefetching={isRefetching}
                        footer={
                            <Flex flexDirection="column" gap="0.5rem">
                                <Flex justifyContent="space-between">
                                    <ArchiveLabel>
                                        Evapotraspirazione
                                    </ArchiveLabel>
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
                        isRefetching={isRefetching}
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
                        isRefetching={isRefetching}
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
            </main>
            <aside>
                <GraphGrid>
                    <Graph
                        title={GraphTemperatureTitle}
                        aria-label={GraphTemperatureTitle}
                    >
                        <BaseLineChart data={day.graph_temperature} />
                    </Graph>
                    <Graph
                        title={GraphHumidityTitle}
                        aria-label={GraphHumidityTitle}
                    >
                        <BaseLineChart data={day.graph_humidity} />
                    </Graph>
                    <Graph
                        title={GraphPressureTitle}
                        aria-label={GraphPressureTitle}
                    >
                        <BaseLineChart
                            data={day.graph_pressure}
                            leftMargin={50}
                        />
                    </Graph>
                    <Graph
                        title={GraphMaxWindTitle}
                        aria-label={GraphMaxWindTitle}
                    >
                        <WindLineChart data={day.graph_wind_max} />
                    </Graph>
                    <Graph title={GraphAvarageWindDirection}>
                        <WindDirGraph
                            data={day.graph_wind_dir}
                            title={GraphAvarageWindDirection}
                        />
                    </Graph>
                    <Graph
                        title={GraphAvarageWindDistribution}
                        aria-label={GraphAvarageWindDistribution}
                    >
                        <WindPieChart data={day.graph_wind_dir_pie} />
                    </Graph>
                    <Graph
                        title={GraphrainRateTitle}
                        aria-label={GraphrainRateTitle}
                    >
                        <BaseLineChart data={day.graph_rain_rate} />
                    </Graph>
                    <Graph
                        title={GraphTemperatureDownUp}
                        aria-label={GraphrainRateTitle}
                    >
                        <TettoPratoLineChart
                            data={day.graph_temperature_tetto_prato}
                            title={GraphTemperatureDownUp}
                        />
                    </Graph>
                </GraphGrid>
            </aside>
            <footer>
                <StationInfo>
                    <p>
                        <strong>Davis Vantage Pro 2</strong> con schermo
                        ventilato daytime e pluviometro riscaldato
                    </p>
                    <p>
                        Termoigrometro a <strong>180cm su prato</strong>,
                        anemometro posizionato a 12m sul tetto
                    </p>
                    <p>
                        La pagina si aggiorna automaticamente ogni{' '}
                        <strong>5 minuti</strong>
                    </p>
                    <p>
                        se riscontri degli errori{' '}
                        <ErrorLink href="/contatti/index.html">
                            Inviami un messaggio
                        </ErrorLink>
                    </p>
                    <p>
                        <Webcam>
                            <Icon icon={Video} /> Webcam in arrivo!
                        </Webcam>
                    </p>
                    <BackToLink href="/">Torna al mio blog</BackToLink>
                </StationInfo>
            </footer>
        </DataWrapper>
    );
}

function DataBox({ title, children, footer, isRefetching }) {
    return (
        <DataBoxWrapper>
            <DataBoxHeader>
                <h2>{title}</h2>
            </DataBoxHeader>
            <DataBoxBody>{isRefetching ? <Spinner /> : children}</DataBoxBody>
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

function BaseLineChart({ data, leftMargin }) {
    const fullData = [{ id: Math.random(), data }];

    return (
        <ResponsiveLine
            curve="basis"
            margin={{ top: 10, right: 30, bottom: 30, left: leftMargin || 30 }}
            colors={[CHART_COLOR]}
            data={fullData}
            lineWidth={LINE_WIDTH}
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
                tickValues: 'every 2 hour',
            }}
            axisLeft={{
                tickValues: 8,
                format: (v) => v,
            }}
            layers={['grid', 'axes', 'lines']}
            theme={{
                grid: {
                    line: {
                        stroke: CHART_GRID_COLOR,
                        strokeWidth: CHART_GRID_SIZE,
                        strokeDasharray: CHART_GRID_DASH,
                    },
                },
                axis: {
                    ticks: {
                        text: {
                            fill: 'var(--color-text-dark-accent)',
                        },
                    },
                    domain: {
                        line: {
                            stroke: CHART_AXIS_COLOR,
                            strokeWidth: CHART_GRID_SIZE,
                        },
                    },
                },
                fontSize: CHART_FONT_SIZE,
            }}
        />
    );
}

function WindLineChart({ data }) {
    const fullData = [{ id: Math.random(), data }];

    return (
        <ResponsiveLine
            margin={{ top: 10, right: 30, bottom: 30, left: 30 }}
            colors={[CHART_COLOR]}
            data={fullData}
            lineWidth={LINE_WIDTH}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d %H:%M',
                useUTC: false,
                precision: 'minute',
            }}
            yScale={{
                type: 'linear',
                min: minBy(data, (d) => d.y).y - 1,
                max: maxBy(data, (d) => d.y).y + 1,
            }}
            axisBottom={{
                format: '%H',
                tickValues: 'every 2 hour',
            }}
            axisLeft={{
                tickValues: 8,
            }}
            theme={{
                grid: {
                    line: {
                        stroke: CHART_GRID_COLOR,
                        strokeWidth: CHART_GRID_SIZE,
                        strokeDasharray: CHART_GRID_DASH,
                    },
                },
                axis: {
                    ticks: {
                        text: {
                            fill: 'var(--color-text-dark-accent)',
                        },
                    },
                    domain: {
                        line: {
                            stroke: CHART_AXIS_COLOR,
                            strokeWidth: CHART_GRID_SIZE,
                        },
                    },
                },
                fontSize: CHART_FONT_SIZE,
            }}
            pointSize={6}
            pointColor="var(--color-text)"
            useMesh={true}
            tooltip={(point) => {
                return (
                    <Point>
                        {point.point.data.y}km/h da {point.point.data.dir}
                    </Point>
                );
            }}
        />
    );
}
function WindDirGraph({ data }) {
    const fullData = [{ id: Math.random(), data }];

    return (
        <ResponsiveLine
            curve="basis"
            margin={{ top: 10, right: 30, bottom: 30, left: 40 }}
            colors={[CHART_COLOR]}
            data={fullData}
            lineWidth={LINE_WIDTH}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d %H:%M',
                useUTC: false,
                precision: 'minute',
            }}
            yScale={{
                type: 'point',
            }}
            axisBottom={{
                format: '%H',
                tickValues: 'every 2 hour',
            }}
            axisLeft={{
                format: (tick) => {
                    return convertWindDirection(tick);
                },
            }}
            layers={['grid', 'axes', 'lines']}
            theme={{
                grid: {
                    line: {
                        stroke: CHART_GRID_COLOR,
                        strokeWidth: CHART_GRID_SIZE,
                        strokeDasharray: CHART_GRID_DASH,
                    },
                },
                axis: {
                    ticks: {
                        text: {
                            fill: 'var(--color-text-dark-accent)',
                        },
                    },
                    domain: {
                        line: {
                            stroke: CHART_AXIS_COLOR,
                            strokeWidth: CHART_GRID_SIZE,
                        },
                    },
                },
                fontSize: CHART_FONT_SIZE,
            }}
        />
    );
}

function TettoPratoLineChart({ data }) {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 60, bottom: 30, left: 25 }}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d %H:%M',
                useUTC: false,
                precision: 'minute',
            }}
            yScale={{
                type: 'linear',
                min: minBy(union(data[0].data, data[1].data), (v) => v.y).y - 1,
                max: maxBy(union(data[0].data, data[1].data), (v) => v.y).y + 1,
            }}
            axisBottom={{
                format: '%H',
                tickValues: 'every 2 hour',
            }}
            axisLeft={{
                tickValues: 8,
            }}
            colors={[CHART_COLOR, CHART_SECONDARY_COLOR]}
            axisTop={null}
            axisRight={null}
            pointSize={0}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: -30,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 50,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    itemTextColor: 'var(--color-text)', // <= this worked for me in the end
                },
            ]}
            theme={{
                grid: {
                    line: {
                        stroke: CHART_GRID_COLOR,
                        strokeWidth: CHART_GRID_SIZE,
                        strokeDasharray: CHART_GRID_DASH,
                    },
                },
                axis: {
                    ticks: {
                        text: {
                            fill: 'var(--color-text-dark-accent)',
                        },
                    },
                    domain: {
                        line: {
                            stroke: CHART_AXIS_COLOR,
                            strokeWidth: CHART_GRID_SIZE,
                        },
                    },
                },
                fontSize: CHART_FONT_SIZE,
            }}
        />
    );
}

function WindPieChart({ data }) {
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={CHART_AXIS_COLOR}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={15}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
            }}
            arcLabel={(v) => `${v.value}%`}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    justify: false,
                    translateX: -80,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 40,
                    itemHeight: 18,
                    itemTextColor: 'var(--color-text)',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 9,
                    symbolShape: 'circle',
                },
            ]}
        />
    );
}

function Graph({ title, children, ...props }) {
    return (
        <GraphWrapper {...props}>
            <article>
                <GraphTitle>{title}</GraphTitle>
                {children}
            </article>
        </GraphWrapper>
    );
}

function Spinner({ ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            {...props}
        >
            <style>
                {
                    '@keyframes spinner_MGfb{93.75%,to{opacity:.2}}.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}'
                }
            </style>
            <circle
                cx={4}
                cy={12}
                r={3}
                className="spinner_S1WN"
                fill="var(--color-text)"
            />
            <circle
                cx={12}
                cy={12}
                r={3}
                className="spinner_S1WN"
                style={{
                    animationDelay: '-.65s',
                }}
                fill="var(--color-text)"
            />
            <circle
                cx={20}
                cy={12}
                r={3}
                className="spinner_S1WN"
                style={{
                    animationDelay: '-.5s',
                }}
                fill="var(--color-text)"
            />
        </svg>
    );
}

function convertWindDirection(degree) {
    const val = degree ? Math.floor(degree / 22.5 + 0.5) : null;
    const arr = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ];
    return arr[val % 16];
}

const Header = styled.header`
    display: flex;
    padding-right: var(--space-unit);
    position: sticky;
    background: var(--color-background);
    margin-top: calc(var(--space-unit) * 1.5);
`;

const HeaderLeft = styled.div``;

/*
const CloseButton = styled.a`
    color: var(--color-text);
    position: absolute;
    right: calc(var(--space-unit) * 1.5);
    top: calc(var(--space-unit) * 1.8);
    z-index: 1;
    cursor: pointer;
`; */

const Center = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const LoadingInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
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

const DataWrapper = styled.div`
    padding-bottom: calc(var(--space-unit) * 4);
`;

const LatestUpdate = styled.div`
    margin-top: calc(var(--space-unit) * 1.5);
    font-size: var(--font-size-small);
    strong {
        ${boldStyles}
    }
`;

const DataGrid = styled.ul`
    margin-top: calc(var(--space-unit) * 1.5);
    display: flex;
    flex-direction: column;
    gap: calc(var(--space-unit) * 1);
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        grid-gap: 1rem;
    }
`;

const DataBoxWrapper = styled.li`
    background-color: var(--color-background-light);
    border-radius: 10px;
    line-height: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const DataBoxHeader = styled.header`
    padding: calc(var(--space-unit) / 2);
    background: var(--color-background-x-light);
    color: var(--color-text-light-accent);
    ${boldStyles}
`;
const DataBoxBody = styled.div`
    height: 6em;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DataBoxFooter = styled.footer`
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

const GraphGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
    margin-top: calc(var(--space-unit) * 1.5);
`;

const graphCss = css`
    width: 100%;
    aspect-ratio: 3/2;
`;
const GraphWrapper = styled.li`
    article {
        ${graphCss}
    }
`;

const GraphTitle = styled.h2`
    font-size: var(--font-size-base);
    font-weight: 700;
    color: var(--color-text-light-accent);
    margin-bottom: 0.5rem;
`;

const Point = styled.div`
    font-size: var(--font-size-small);
    background-color: var(--color-background);
    color: var(--color-text);
    padding: 0.5em 1em;
`;

const StationInfo = styled.div`
    margin-top: calc(var(--space-unit) * 2.5);
    font-size: var(--font-size-small);
    strong {
        ${boldStyles}
    }
    p {
        margin-bottom: calc(var(--space-unit) * 0.25);
    }
`;

const BackToLink = styled.a`
    ${linksStyles}
    display: block;
`;

const Webcam = styled.span`
    font-size: var(--font-size-small);
    gap: 0.25em;
    ${boldStyles}
`;

const StyledPageTitle = styled(PageTitle)`
    position: relative;
    width: max-content;
`;

const Beta = styled.span`
    position: absolute;
    top: 0px;
    right: -60px;
    font-size: var(--font-size-x-small);
    background-color: var(--color-primary);
    color: black;
    padding: 0.3em 0.6em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    border-radius: 15px;
`;

export default Meteo;
