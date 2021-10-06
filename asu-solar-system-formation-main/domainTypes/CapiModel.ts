import {
  GRAPH_ELEMENTS,
  OBJECT_PARAMETERS,
  TestObjectId,
  MODEL_ELEMENTS_VISIBLE,
} from 'domainTypes';
import { MODES } from './SettingsModel';

export interface ICapiModel {
  'Sim.Bank.Objects': MODES;
  'Sim.Bank.Visible': boolean;
  'Sim.Bank.Enabled': boolean;
  'Sim.Object.Selected.Value': TestObjectId;
  'Sim.Object.Selected.Distance': number;
  'Sim.Object.Selected.Angle': number;
  'Sim.SS.Radius.Value': number;
  'Sim.SS.Radius.Visible': boolean;
  'Sim.SS.Radius.Enabled': boolean;
  'Sim.Parameters.Displayed': OBJECT_PARAMETERS[];
  'Sim.Parameters.Visible': boolean;
  'Sim.Model.Elements.Visible': MODEL_ELEMENTS_VISIBLE[];
  'Sim.Graph.Visible': boolean;
  'Sim.Graph.Button.Visible': boolean;
  'Sim.Graph.Button.Enabled': boolean;
  'Sim.Graph.Elements.Visible': GRAPH_ELEMENTS[];
  'Sim.Graph.Clear.Clear': boolean;
  'Sim.Graph.Clear.Visible': boolean;
  'Sim.Graph.Clear.Enabled': boolean;
  'Sim.Graph.Points.Plotted': number;
  'Sim.Graph.Points.Smallest': number;
  'Sim.Graph.Points.Largest': number;
  'Sim.Object.Planets.Correct': boolean;
  'Sim.Object.Exoplanets.Correct': boolean;
}
