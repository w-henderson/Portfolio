import React from "react";
import { GitHub, ExitToAppRounded, LibraryBooks } from "@material-ui/icons";
import "../styles/Project.scss";

interface ProjectProps {
	project: ProjectData,
	width: number
}

class Project extends React.Component<ProjectProps> {
	render() {
		let background = `url("/images/project/${this.props.width > 900 ? "vertical" : "horizontal"}/${this.props.project.image}")`;

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

						{this.props.project.links.source !== undefined &&
							<a className="secondary" href={this.props.project.links.source}>
								<GitHub />
								View Source
							</a>
						}

						{this.props.project.links.blog !== undefined &&
							<a className="secondary" href={this.props.project.links.blog}>
								<LibraryBooks />
								Blog Post
							</a>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Project;