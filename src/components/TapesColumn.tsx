import React from 'react';
import { connect } from 'react-redux';

import { createShowDate, splitShowDate, durationToHHMMSS } from '../lib/utils';

import Column from './Column';
import Row from './Row';
import RowHeader from './RowHeader';
import Tag from './Tag';
import { Meta, Source, Tape } from '../types';

const exists = (str: string): boolean => {
  return str && !/unknown/i.test(str);
};

const cleanFlac = (str: string): string => {
  return str ? str.replace(/Flac|Bit/g, '') + '-BIT ' : '';
};

// TODO: i18n
const pluralize = (str: string, count: number): string => {
  if (count === 1) return str;

  return str + 's';
};

type TapesColumnProps = {
  tapes: {
    data: Tape;
    meta: Meta;
  };
  artistSlug: string;
  activeSourceId: number;
};

const TapesColumn = ({ tapes, artistSlug, activeSourceId }: TapesColumnProps): JSX.Element => {
  const sources =
    tapes.data && tapes.data.sources && tapes.data.sources.length ? tapes.data.sources : null;

  const { year, month, day } = sources
    ? splitShowDate(sources[0].display_date)
    : { year: '', month: '', day: '' };

  return (
    <Column heading="Sources" loading={tapes.meta && tapes.meta.loading} loadingAmount={1}>
      <style jsx>{`
        .details {
          font-size: 0.7em;
          padding: 4px 0;
          display: flex;
          flex-direction: row;
        }

        .details > .label {
          color: #696969;
          min-width: 48px;
          padding-right: 9px;
        }

        .main {
          display: flex;
          margin-bottom: 4px;
        }

        .duration {
          min-width: 53px;
        }
      `}</style>
      {sources &&
        sources.map((source: Source, idx: number) => (
          <div key={source.id}>
            <RowHeader>
              SOURCE {idx + 1} OF {sources.length}
            </RowHeader>
            <Row
              href={`/${artistSlug}/${year}/${month}/${day}?source=${source.id}`}
              active={source.id === activeSourceId || (!activeSourceId && idx === 0)}
            >
              <div>
                <div className="main">
                  <div className="duration">{durationToHHMMSS(source.duration)}</div>
                  {source.is_soundboard && <Tag>SBD</Tag>}
                  {false && source.flac_type !== 'NoFlac' && (
                    <Tag>{cleanFlac(source.flac_type)}FLAC</Tag>
                  )}
                  {source.is_remaster && <Tag>REMASTER</Tag>}
                </div>
                {source.avg_rating > 0 && (
                  <div className="details">
                    <div className="label">{artistSlug === 'phish' ? 'Dot Net' : 'Rating'}:</div>{' '}
                    <div>
                      {Number(source.avg_rating).toFixed(2)} /{' '}
                      {source.num_ratings || source.num_reviews}{' '}
                      {pluralize('rating', source.num_ratings || source.num_reviews)}
                    </div>
                  </div>
                )}
                {exists(source.taper) && (
                  <div className="details">
                    <div className="label">Taper:</div> <div>{source.taper}</div>
                  </div>
                )}
                {exists(source.transferrer) && (
                  <div className="details">
                    <div className="label">Transferrer:</div> <div>{source.transferrer}</div>
                  </div>
                )}
                {exists(source.upstream_identifier) && (
                  <div className="details">
                    <div className="label">SHNID:</div> <div>{source.upstream_identifier}</div>
                  </div>
                )}
                {exists(source.source) && (
                  <div className="details">
                    <div className="label">Source:</div> <div>{source.source}</div>
                  </div>
                )}
                {exists(source.lineage) && (
                  <div className="details">
                    <div className="label">Lineage:</div> <div>{source.lineage}</div>
                  </div>
                )}
                {exists(source.taper_notes) && (
                  <div className="details">
                    <div className="label">Taper Notes:</div>{' '}
                    <TaperNotes notes={source.taper_notes} />
                  </div>
                )}
              </div>
            </Row>
          </div>
        ))}
    </Column>
  );
};

const TaperNotes = ({ notes }: { notes: string }): JSX.Element => {
  if (!notes) return null;

  const onClick = (e: React.MouseEvent<HTMLDetailsElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <details onClick={(e) => onClick(e)} style={{ whiteSpace: 'pre-wrap' }}>
      <summary>View Notes</summary>
      {notes}
    </details>
  );
};

const mapStateToProps = ({ tapes, app }): TapesColumnProps => {
  const showDate = createShowDate(app.year, app.month, app.day);
  const showTapes =
    tapes[app.artistSlug] && tapes[app.artistSlug][showDate] ? tapes[app.artistSlug][showDate] : {};

  return {
    tapes: showTapes,
    artistSlug: app.artistSlug,
    activeSourceId: parseInt(app.source, 10),
  };
};

export default connect(mapStateToProps)(TapesColumn);