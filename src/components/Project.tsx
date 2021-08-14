import React from "react";
import { GitHub, ExitToAppRounded } from "@material-ui/icons";
import "../styles/Project.scss";

interface ProjectProps {
	project: ProjectData
}

class Project extends React.Component<ProjectProps> {
	render() {
		let background = `url("${this.props.project.image}")`;

		return (
			<div className="project">
				{this.props.project.image !== undefined &&
					<div className="image" style={{ backgroundImage: background }}></div>
				}

				<div className="content">
					<div>
						<h2>{this.props.project.name}</h2>
						{this.props.project.description}
					</div>

					<div className="tags">
						{this.props.project.tags.map((tag, index) =>
							<div key={index}>{tag}</div>
						)}
					</div>

					<div className="links">
						{this.props.project.links.production !== undefined &&
							<a className="primary" href={this.props.project.links.production}>
								Live Demo
								<ExitToAppRounded />
							</a>
						}

						<a className="secondary" href={this.props.project.links.source}>
							<GitHub />
							View Source
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Project;