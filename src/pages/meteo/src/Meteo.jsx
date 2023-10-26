import { useEffect } from 'react';
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
import Low from '../../../public/icons/Low.svg';
import ArrowUpRight from '../../../public/icons/ArrowUpRight.svg';
import BackIcon from '../../../public/icons/ChevronLeft.svg';
import Text from '../../../public/icons/Text.svg';
import Refresh from '../../../public/icons/Refresh.svg';
import Video from '../../../public/icons/Video.svg';
import Clock from '../../../public/icons/Clock.svg';
import Info from '../../../public/icons/Info.svg';
import { linksStyles, boldStyles } from '../../../theme';
import Flex from './Flex';
import Popover from './Popover/index';

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
const WIND_UNIT = 'km/h';
const PRESSURE_UNIT = 'hPa';
const RAIN_UNIT = 'mm';
const RAIN_RATE_UNIT = 'mm/h';
const monoStyles = css`
    font-family: var(--font-family-mono);
    font-weight: 800;
`;
const LINE_WIDTH = 1;

const GraphTemperatureTitle = `Temperatura (${TEMPERATURE_UNIT})`;
const GraphHumidityTitle = `Umidità relativa(${HUMIDITY_UNIT})`;
const GraphPressureTitle = `Pressione (${PRESSURE_UNIT})`;
const GraphMaxWindTitle = `Raffica massima (${WIND_UNIT})`;
const GraphAvarageWindDirection = `Direzione del vento`;
const GraphAvarageWindDistribution = `Distribuzione vento`;
const GraphrainRateTitle = `Intensità pioggia (${RAIN_RATE_UNIT})`;
const GraphTemperatureDownUp = `Temperatura 2m/12m (${TEMPERATURE_UNIT})`;
const GraphSolarRadiationTitle = `radiazione solare (W/m2)`;

function Meteo() {
    const { isLoading, isSuccess, isError, data, isRefetching, refetch } =
        useQuery(
            // default cache is 5 mins, same as our interval data
            'meteo',
            getMeteoData,
            {
                refetchOnWindowFocus: false,
                refetchInterval: 300000, // 5 mins
            },
        );

    useEffect(() => {
        document.body.removeAttribute('style'); // see index.html to avoid white flash before app kicks in
    }, []);

    return (
        <>
            <GlobalStyles />
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
                    <DataPage
                        data={data}
                        isRefetching={isRefetching}
                        refetch={refetch}
                    />
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

function DataPage({ data, isRefetching, refetch }) {
    const { current, day } = data;

    return (
        <DataWrapper>
            <Header>
                <BackToLink href="/">
                    <Icon xs icon={BackIcon} left />
                    Torna al mio blog
                </BackToLink>
                <StyledPageTitle xsmall>
                    Meteo Concenedo <Beta>beta</Beta>
                </StyledPageTitle>

                <HeaderUpdate>
                    <HeaderUpdateLeft>
                        <LatestUpdate>
                            <strong>
                                <MonoText>
                                    {!isRefetching
                                        ? current.last_data_day
                                        : '--/--/----'}
                                </MonoText>
                            </strong>{' '}
                            alle{' '}
                            <strong>
                                <MonoText>
                                    {!isRefetching
                                        ? current.last_data_hour
                                        : '--:--'}
                                </MonoText>
                            </strong>
                        </LatestUpdate>
                    </HeaderUpdateLeft>
                    <HeaderUpdateRight>
                        <RefreshButton onClick={refetch}>
                            {!isRefetching && <Icon icon={Refresh} />}
                            {isRefetching ? 'Aggiorno...' : 'Aggiorna'}
                        </RefreshButton>
                    </HeaderUpdateRight>
                </HeaderUpdate>
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
                        title="Umidità relativa"
                        tooltip={
                            <BasicPopover
                                content={
                                    <PopoverParagraph>
                                        È il <strong>rapporto</strong> tra la{' '}
                                        <strong>
                                            quantità di vapore acqueo
                                        </strong>{' '}
                                        contenuto in una massa d’aria e la{' '}
                                        <strong>
                                            quantità massima di vapore acqueo
                                        </strong>{' '}
                                        che la stessa massa d’aria riesce a
                                        contenere nelle stesse condizioni di
                                        temperatura e pressione.
                                    </PopoverParagraph>
                                }
                            />
                        }
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            È la{' '}
                                            <strong>
                                                forza esercitata dal peso di una
                                                colonna d’aria
                                            </strong>{' '}
                                            sulla superficie terrestre, che ha
                                            come base l’unità di superficie e
                                            come altezza il limite superiore
                                            dell’atmosfera a partire dal livello
                                            del mare.
                                        </PopoverParagraph>
                                        <PopoverParagraph>
                                            Si misura con il barometro e si
                                            esprime in hPa, unità pari ad una
                                            forza di 100 Newton su una
                                            superficie di un metro quadrato.
                                        </PopoverParagraph>
                                        <PopoverParagraph>
                                            <strong>
                                                Mediamente, al livello del mare,
                                                essa vale 1013,25 hPa.
                                            </strong>
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
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
                                            </BoldText>
                                        </AccentText>
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            La misura in millimetri corrisponde
                                            alla così detta “altezza
                                            pluviometrica o altezza di pioggia”.
                                        </PopoverParagraph>
                                        <PopoverParagraph>
                                            <strong>
                                                Un millimetro di pioggia
                                            </strong>{' '}
                                            misurato all’interno del pluviometro
                                            è pari come quantità a{' '}
                                            <strong>
                                                1 litro caduto su una superficie
                                                di 1 metro quadrato:
                                            </strong>
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
                        isRefetching={isRefetching}
                        footer={
                            <Flex flexDirection="column" gap="0.5rem">
                                <Flex justifyContent="space-between">
                                    <ArchiveLabel>Mese</ArchiveLabel>
                                    <Flex gap="1rem">
                                        <ArchiveText>
                                            <MonoText>
                                                {current.rain_month}
                                                {RAIN_UNIT}
                                            </MonoText>
                                        </ArchiveText>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-between">
                                    <ArchiveLabel>Anno</ArchiveLabel>
                                    <Flex gap="1rem">
                                        <ArchiveText>
                                            <MonoText>
                                                {current.rain_year}
                                                {RAIN_UNIT}
                                            </MonoText>
                                        </ArchiveText>
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            I millimetri di pioggia caduti in
                                            un’ora definiscono quella che viene
                                            chiamata dai meteorologi intensità
                                            della pioggia
                                        </PopoverParagraph>
                                        <PopoverParagraph>
                                            <ul>
                                                <li>
                                                    <strong>
                                                        pioviggine debole
                                                    </strong>{' '}
                                                    ({'i<0.1'})
                                                </li>
                                                <li>
                                                    <strong>
                                                        pioviggine moderata
                                                    </strong>{' '}
                                                    ({'0.1<=i<0.5'})
                                                </li>
                                                <li>
                                                    <strong>
                                                        pioviggine forte
                                                    </strong>{' '}
                                                    ({'0.5<=i<1'})
                                                </li>
                                                <li>
                                                    <strong>
                                                        pioggia debole
                                                    </strong>{' '}
                                                    ({'1<=i<2.5'})
                                                </li>
                                                <li>
                                                    <strong>
                                                        pioggia moderata
                                                    </strong>{' '}
                                                    ({'2.5<=i<10'})
                                                </li>
                                                <li>
                                                    <strong>
                                                        pioggia forte
                                                    </strong>{' '}
                                                    ({'10<=i<50'})
                                                </li>
                                                <li>
                                                    <strong>nubifragio</strong>{' '}
                                                    ({'i>50'})
                                                </li>
                                            </ul>
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
                        footer={
                            <Flex flexDirection="column" gap="0.5rem">
                                <Flex justifyContent="space-between">
                                    <MaxLabel />
                                    <Flex gap="1rem">
                                        {day.rain_rate_max > 0 ? (
                                            <>
                                                <HiText>
                                                    <MonoText>
                                                        {day.rain_rate_max}
                                                        {RAIN_RATE_UNIT}
                                                    </MonoText>
                                                </HiText>
                                                <AtValue>
                                                    {day.rain_rate_max_at}
                                                </AtValue>
                                            </>
                                        ) : (
                                            <HiText>
                                                <MonoText>-</MonoText>
                                            </HiText>
                                        )}
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-between">
                                    <AccentLabel icon={<UpAccentIcon />}>
                                        Ultimi 15 minuti
                                    </AccentLabel>
                                    <Flex gap="1rem">
                                        <AccentText>
                                            <MonoText>
                                                {current.rain_rate_last_15_min ||
                                                    0}
                                                {RAIN_RATE_UNIT}
                                            </MonoText>
                                        </AccentText>
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
                                {current.rain_rate} {RAIN_RATE_UNIT}
                            </FatValue>
                            <SmallValue>
                                {rainRateText(current.rain_rate)}
                            </SmallValue>
                        </Flex>
                    </DataBox>
                    <DataBox
                        title="Punto di rugiada"
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            È la temperatura alla quale l’aria
                                            deve raffreddarsi affinché il vapore
                                            acqueo presente inizi a condensare.
                                            Il punto di rugiada fornisce
                                            informazioni sull’umidità dell’aria.
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            Indica la{' '}
                                            <strong>
                                                temperatura più bassa che
                                                potremo raggiungere,
                                            </strong>{' '}
                                            per effetto dell’evaporazione
                                            dell’acqua nell’aria a pressione
                                            costante. Utile per capire se la
                                            pioggia può trasformarsi in neve
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            Indica la{' '}
                                            <strong>
                                                temperatura effettiva da noi
                                                avvertita
                                            </strong>{' '}
                                            e si calcola conoscendo i valori di
                                            temperatura e umidità relativa
                                            dell’aria.
                                        </PopoverParagraph>
                                        <PopoverParagraph>
                                            Il <strong>wind chill</strong>{' '}
                                            invece e si calcola conoscendo i
                                            valori di
                                            <strong>
                                                {' '}
                                                temperatura e velocità del vento
                                            </strong>
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            Indica l’energia trasferita dal sole
                                            per unità di area
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
                        isRefetching={isRefetching}
                        footer={
                            <Flex flexDirection="column" gap="0.5rem">
                                <Flex justifyContent="space-between">
                                    <ArchiveLabel>
                                        Evapotraspirazione
                                    </ArchiveLabel>
                                    <Flex gap="1rem">
                                        <ArchiveText>
                                            <MonoText>
                                                {current.et_day}
                                                {RAIN_UNIT}
                                            </MonoText>
                                        </ArchiveText>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-between">
                                    <ArchiveLabel>Etp</ArchiveLabel>
                                    <Flex gap="1rem">
                                        <ArchiveText>
                                            <MonoText>
                                                {current.et_year}
                                                {RAIN_UNIT}
                                            </MonoText>
                                        </ArchiveText>
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            La{' '}
                                            <strong>
                                                temperatura rilevata dal secondo
                                                sensore,
                                            </strong>{' '}
                                            posto a 12m sul tetto. In inverno,
                                            grazie all’inversione termica, i
                                            valori possono risultare più alti
                                            rispetto al sensore posto a 180cm su
                                            prato
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
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
                        tooltip={
                            <BasicPopover
                                content={
                                    <>
                                        <PopoverParagraph>
                                            L’{' '}
                                            <strong>
                                                umidità relativa rilevata dal
                                                secondo sensore,
                                            </strong>{' '}
                                            posto a 12m sul tetto.
                                        </PopoverParagraph>
                                    </>
                                }
                            />
                        }
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
                    <Graph
                        title={GraphSolarRadiationTitle}
                        aria-label={GraphSolarRadiationTitle}
                    >
                        <BaseLineChart data={day.graph_solar_radiation} />
                    </Graph>
                </GraphGrid>
            </aside>
            <footer>
                <StationInfo>
                    <p>
                        <strong>Davis Vantage Pro 2</strong> con schermo
                        ventilato daytime e pluviometro riscaldato, quota
                        pozzetto <strong>922m</strong>
                    </p>
                    <p>
                        Termoigrometro a <strong>180cm su prato</strong>,
                        anemometro e secondo schermo ventilato daytime
                        posizionati a 12m sul tetto.
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
                </StationInfo>
            </footer>
        </DataWrapper>
    );
}

function DataBox({ title, tooltip, children, footer, isRefetching }) {
    return (
        <DataBoxWrapper>
            <DataBoxHeader>
                <h2>{title}</h2> {tooltip}
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
        <ArchiveText>
            <Icon icon={Text} />
        </ArchiveText>
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

function InfoIcon() {
    return <Icon icon={Info} style={{ cursor: 'pointer' }} />;
}

function BasicPopover({ content }) {
    return (
        <Popover content={content}>
            <InfoIcon />
        </Popover>
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
            margin={{ top: 30, right: 60, bottom: 30, left: 30 }}
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
    return val ? arr[val % 16] : '-';
}

function rainRateText(rate) {
    if (!rate) {
        return null;
    } else if (rate < 0.1) {
        return 'pioviggine debole';
    } else if (rate >= 0.1 && rate < 0.5) {
        return 'pioviggine moderata';
    } else if (rate >= 0.5 && rate < 1) {
        return 'pioviggine forte';
    } else if (rate >= 1 && rate < 2.5) {
        return 'pioggia debole';
    } else if (rate >= 2.5 && rate < 10) {
        return 'pioggia moderata';
    } else if (rate >= 10 && rate < 50) {
        return 'pioggia forte';
    } else if (rate >= 50) {
        return 'nubifragio';
    }
}

const Header = styled.header`
    display: flex;
    flex-direction: column;
    margin-top: calc(var(--space-unit) * 1.5);
`;

const HeaderUpdate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: calc(var(--space-unit) * 1.5);
`;
const HeaderUpdateLeft = styled.div``;
const HeaderUpdateRight = styled.div``;

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
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const ArchiveText = styled.span`
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
    sup {
        vertical-align: super;
        font-size: smaller;
    }
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
    display: flex;
    align-items: center;
    font-size: var(--font-size-small);
    margin-bottom: calc(var(--space-unit) * 0.25);
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

const RefreshButton = styled.button`
    all: unset;
    ${boldStyles}
    color: var(--color-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.2em;
`;

const PopoverParagraph = styled.p`
    strong {
        ${boldStyles}
    }
    margin-bottom: 1em;
    :last-child {
        margin-bottom: 0;
    }
`;

export default Meteo;
